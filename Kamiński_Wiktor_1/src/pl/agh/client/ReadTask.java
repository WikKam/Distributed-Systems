package pl.agh.client;

import pl.agh.utils.ProtocolAdapter;

import java.io.IOException;

public class ReadTask implements Runnable {
    private final ProtocolAdapter protocolAdapter;

    public ReadTask(ProtocolAdapter adapter) throws IOException {
        this.protocolAdapter = adapter;
        System.out.println(adapter.getProtocol() + " read task created successfully!");
    }

    @Override
    public void run() {
        while (true){
            try {
                String message = protocolAdapter.read();
                System.out.println("[" + protocolAdapter.getProtocol() + "] " + message);
            } catch (IOException e) {
                System.out.println("Disconnected from server");
                return;
            }
        }
    }
}
