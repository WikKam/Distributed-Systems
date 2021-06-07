package pl.agh.server;

import pl.agh.utils.UdpAdapter;

import java.io.IOException;

public class UdpServerTask implements Runnable {
    private final ChatServer chatServer;
    private final UdpAdapter protocolAdapter;

    public UdpServerTask(ChatServer chatServer, UdpAdapter adapter){
        this.chatServer = chatServer;
        this.protocolAdapter = adapter;
    }

    public void send(String message, int port){
        chatServer.getTasks()
                .stream()
                .filter(t -> t.getProtocolAdapter().getPort() != port)
                .forEach(t -> protocolAdapter.write(message, t.getProtocolAdapter().getPort()));
    }

    @Override
    public void run() {
        while (true){
                try {
                    String message = protocolAdapter.read();
                    int port = protocolAdapter.getSocketData().getPort();
                    this.send("[" + port + "]: " + message, port);
                } catch (IOException e) {
                    System.out.println(this.protocolAdapter.getProtocol().name() + " client with socket "
                            + protocolAdapter.getPort()
                            + " "
                            + protocolAdapter.getInetAddress()
                            + " disconnected"
                    );
                }
        }
    }
}
