import actors.Dispatcher;
import actors.MonitoringStation;
import akka.actor.typed.ActorRef;
import akka.actor.typed.ActorSystem;
import akka.actor.typed.Behavior;
import akka.actor.typed.Terminated;
import akka.actor.typed.javadsl.Behaviors;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import requests.ApiMessage;
import requests.StationMessage;
import requests.StationNameMessage;
import requests.StationRequest;

import java.io.File;
import java.util.Random;

public class Main {

    public static Behavior<Void> create() {
        Random rand = new Random();
        return Behaviors.setup(
                context -> {
                    ActorRef<ApiMessage> dispatcher =  context.spawn(Dispatcher.create(), "dispatcher");
                    ActorRef<StationMessage> station1 = context.spawn(MonitoringStation.create(), "station1");
                    ActorRef<StationMessage> station2 = context.spawn(MonitoringStation.create(), "station2");
                    ActorRef<StationMessage> station3 = context.spawn(MonitoringStation.create(), "station3");


                    System.out.println("[System]: Actors initialized");
                    Thread.sleep(2000);

                    station1.tell(new StationNameMessage("station1"));
                    station2.tell(new StationNameMessage("station2"));
                    station3.tell(new StationNameMessage("station3"));
                    station1.tell(new StationRequest(100, rand.nextInt(50), 300,dispatcher));
                    station2.tell(new StationRequest(100, rand.nextInt(50),300,dispatcher));
                    station3.tell(new StationRequest(100, rand.nextInt(50),300,dispatcher));
                    station1.tell(new StationRequest(100, rand.nextInt(50),300,dispatcher));
                    station2.tell(new StationRequest(100, rand.nextInt(50),300,dispatcher));
                    station3.tell(new StationRequest(100, rand.nextInt(50),300,dispatcher));
                    
                    Thread.sleep(1000);

                    return Behaviors.receive(Void.class)
                            .onSignal(Terminated.class, sig -> Behaviors.stopped())
                            .build();
                });
    }

    public static void main(String[] args) {
        File configFile = new File("src/main/resources/dispatcher.conf");
        Config config = ConfigFactory.parseFile(configFile);
        System.out.println("Dispatcher config: " + config);
        ActorSystem.create(Main.create(), "SatelliteSystem", config);
    }
}
