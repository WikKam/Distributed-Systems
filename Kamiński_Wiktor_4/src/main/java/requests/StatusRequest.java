package requests;

import akka.actor.typed.ActorRef;

public class StatusRequest implements ApiMessage {
    private final int firstSatelliteId;
    private final int range;
    private final long timeout;
    private final String id;

    public ActorRef<StationMessage> getReplyTo() {
        return replyTo;
    }

    private final ActorRef<StationMessage> replyTo;

    public StatusRequest(int firstSatelliteId, int range, long timeout, String id, ActorRef<StationMessage> actorRef) {
        this.firstSatelliteId = firstSatelliteId;
        this.range = range;
        this.timeout = timeout;
        this.id = id;
        this.replyTo = actorRef;
    }

    public int getFirstSatelliteId() {
        return firstSatelliteId;
    }

    public int getRange() {
        return range;
    }

    public long getTimeout() {
        return timeout;
    }

    public String getId() {
        return id;
    }
}
