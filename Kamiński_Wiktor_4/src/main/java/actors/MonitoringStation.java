package actors;

import akka.actor.typed.Behavior;
import akka.actor.typed.javadsl.AbstractBehavior;
import akka.actor.typed.javadsl.ActorContext;
import akka.actor.typed.javadsl.Behaviors;
import akka.actor.typed.javadsl.Receive;
import requests.*;
import utils.RequestManager;

public class MonitoringStation extends AbstractBehavior<StationMessage> {
    private String stationId;
    private final RequestManager manager = new RequestManager();

    public static Behavior<StationMessage> create() {
        return Behaviors.setup(MonitoringStation::new);
    }

    public MonitoringStation(ActorContext<StationMessage> context) {
        super(context);
    }

    private Behavior<StationMessage> onStatusResponse(StatusResponse response){
        long timeTaken = System.currentTimeMillis() - manager.getRequestTime(response.getMessageId());
        System.out.println("[" + stationId + "]: " + "response: " + response.getMessageId() +  " in: " + timeTaken + " Finished requests %: " + response.getPercentOfOnTime() + " errors: " + response.getErrors().size());
        response.getErrors()
                .forEach((sat,value) -> System.out.println(("[" + stationId + "]: " + "satellite " + sat + " error " + value)));
        return this;
    }

    private Behavior<StationMessage> onStationRequest(StationRequest query){
        StatusRequest message =
                new StatusRequest(
                        query.getFirstSatelliteId(),
                        query.getRange(),
                        query.getTimeout(),
                        stationId + manager.getNextId(),
                        getContext().getSelf()
                );
        query.getDispatcher().tell(message);
        manager.addRequest(this.stationId);
        return this;
    }

    private Behavior<StationMessage> onStationNameMessage(StationNameMessage query){
        this.stationId = query.getName();
        return this;
    }

    @Override
    public Receive<StationMessage> createReceive() {
        return newReceiveBuilder()
                .onMessage(StatusResponse.class, this::onStatusResponse)
                .onMessage(StationRequest.class, this::onStationRequest)
                .onMessage(StationNameMessage.class, this::onStationNameMessage)
                .build();
    }
}
