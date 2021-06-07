package requests;

import utils.SatelliteData;

import java.util.List;

public class DispatcherScheduleMessage implements ApiMessage {
    private final List<SatelliteData> data;
    private final StatusRequest request;

    public DispatcherScheduleMessage(List<SatelliteData> data, StatusRequest request) {
        this.data = data;
        this.request = request;
    }

    public List<SatelliteData> getData() {
        return data;
    }

    public StatusRequest getRequest() {
        return request;
    }
}
