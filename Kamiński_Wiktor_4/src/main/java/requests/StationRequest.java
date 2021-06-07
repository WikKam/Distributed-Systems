package requests;

import akka.actor.typed.ActorRef;

public class StationRequest implements StationMessage {
    private final int firstSatelliteId;
    private final int range;
    private final long timeout;

    private final ActorRef<ApiMessage> dispatcher;

    public int getFirstSatelliteId() {
        return firstSatelliteId;
    }

    public int getRange() {
        return range;
    }

    public long getTimeout() {
        return timeout;
    }

    public ActorRef<ApiMessage> getDispatcher() {
        return dispatcher;
    }

    public StationRequest(int firstSatelliteId, int range, long timeout, ActorRef<ApiMessage> dispatcher) {
        this.firstSatelliteId = firstSatelliteId;
        this.range = range;
        this.timeout = timeout;
        this.dispatcher = dispatcher;
    }
}
