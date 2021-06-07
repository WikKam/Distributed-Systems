package requests;

import api.SatelliteAPI;
import utils.SatelliteData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class StatusResponse implements StationMessage {
    private final String messageId;
    private final Map<Integer, SatelliteAPI.Status> errors = new HashMap<>();
    private final double percentOfOnTime;


    public StatusResponse(List<SatelliteData> dataOnTime, double percentOfOnTime, String messageId){
        this.messageId = messageId;
        this.percentOfOnTime = percentOfOnTime;
        dataOnTime.stream().filter(data -> {
            try {
                return data.getStatusPromise().get() != SatelliteAPI.Status.OK;
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            return false;
        }).forEach(filtered -> {
            try {
                this.errors.put(filtered.getId(), filtered.getStatusPromise().get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        });
    }

    public String getMessageId() {
        return messageId;
    }

    public Map<Integer, SatelliteAPI.Status> getErrors() {
        return errors;
    }

    public double getPercentOfOnTime() {
        return percentOfOnTime;
    }
}
