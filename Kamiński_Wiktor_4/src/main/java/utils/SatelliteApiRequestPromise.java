package utils;

import api.SatelliteAPI;

import java.util.concurrent.Callable;

public class SatelliteApiRequestPromise implements Callable<SatelliteAPI.Status> {
    int id;

    public SatelliteApiRequestPromise(int id) {
        this.id = id;
    }

    @Override
    public SatelliteAPI.Status call() {
        return SatelliteAPI.getStatus(id);
    }
}
