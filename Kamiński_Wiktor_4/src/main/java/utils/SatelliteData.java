package utils;

import api.SatelliteAPI;

import java.util.concurrent.Future;

public class SatelliteData {
    private final int id;
    private Future<SatelliteAPI.Status> statusPromise;
    private long startTime;

    public SatelliteData(int id, Future<SatelliteAPI.Status> statusPromise) {
        this.id = id;
        this.statusPromise = statusPromise;
        this.startTime = System.currentTimeMillis();
    }

    public long getDuration(long endTime){
        return endTime - startTime;
    }

    public int getId() {
        return id;
    }

    public Future<SatelliteAPI.Status> getStatusPromise() {
        return statusPromise;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStatusPromise(Future<SatelliteAPI.Status> statusPromise) {
        this.statusPromise = statusPromise;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }
}
