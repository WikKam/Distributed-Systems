package requests;

public class StationNameMessage implements StationMessage {
    private final String name;

    public StationNameMessage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
