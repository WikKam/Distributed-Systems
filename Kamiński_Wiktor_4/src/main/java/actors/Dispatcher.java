package actors;

import akka.actor.typed.Behavior;
import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Behaviors;
import akka.actor.typed.javadsl.Receive;
import requests.*;
import utils.SatelliteApiRequestPromise;
import utils.SatelliteData;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Dispatcher extends AbstractBehavior<ApiMessage> {
    private final ExecutorService executorService = Executors.newFixedThreadPool(500);

    public Dispatcher(ActorContext<ApiMessage> context) {
        super(context);
    }

    public static Behavior<ApiMessage> create() {
        return Behaviors.setup(Dispatcher::new);
    }

    @Override
    public Receive<ApiMessage> createReceive() {
        return newReceiveBuilder()
                .onMessage(StatusRequest.class, this::onStatusRequest)
                .onMessage(DispatcherScheduleMessage.class, this::onDispatcherScheduleMessage)
                .build();
    }

    private Behavior<ApiMessage> onDispatcherScheduleMessage(DispatcherScheduleMessage msg){
        List<SatelliteData> collectedData = msg.getData();
        StatusRequest request = msg.getRequest();
        List<SatelliteData> finished = collectedData
                .stream()
                .filter(data -> data.getStatusPromise().isDone())
                .toList();

        request.getReplyTo().tell(
                new StatusResponse(finished, (double) finished.size() / request.getRange(), request.getId())
        );

        return this;
    }

    private Behavior<ApiMessage> onStatusRequest(StatusRequest request){
        List<SatelliteData> collectedData = IntStream.range(request.getFirstSatelliteId(),
                request.getFirstSatelliteId() + request.getRange())
                .mapToObj(index -> new SatelliteData(index, executorService.submit(new SatelliteApiRequestPromise(index))))
                .collect(Collectors.toList());

        getContext().scheduleOnce(Duration.ofMillis(request.getTimeout()),
                getContext().getSelf(),
                new DispatcherScheduleMessage(collectedData, request));

        return this;
    }
}
