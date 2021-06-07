package pl.agh.server;
import pl.agh.utils.ProtocolAdapter;

import java.io.IOException;


public class ServerTask implements Runnable {
    private final ChatServer chatServer;

    public ProtocolAdapter getProtocolAdapter() {
        return protocolAdapter;
    }

    private final ProtocolAdapter protocolAdapter;

    public ServerTask(ProtocolAdapter adapter, ChatServer chatServer) {
        this.chatServer = chatServer;
        this.protocolAdapter = adapter;
    }

    public void write(String message){
        protocolAdapter.write(message);
    }

    @Override
    public void run() {
        while (true){
            try {
                String message = protocolAdapter.read();
                chatServer.sendMessage(this, "[" + this.protocolAdapter.getPort() + "]: " + message);
            } catch (IOException e) {
                System.out.println(this.protocolAdapter.getProtocol().name() + " client with socket "
                        + protocolAdapter.getPort()
                        + " "
                        + protocolAdapter.getInetAddress()
                        + " disconnected"
                );
                chatServer.removeTask(this);
                return;
            }
        }
    }
}
