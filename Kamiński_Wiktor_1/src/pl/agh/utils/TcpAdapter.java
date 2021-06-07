package pl.agh.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;

public class TcpAdapter implements ProtocolAdapter {
    private PrintWriter writer = null;
    private BufferedReader reader = null;
    private final SocketData socketData;

    public TcpAdapter(Socket clientSocket){
        this.socketData = new SocketData(clientSocket.getInetAddress(), clientSocket.getPort());
        try {
            writer = new PrintWriter(clientSocket.getOutputStream(), true);
        } catch (IOException e) {
            System.out.println("Couldn't create client socket writer");
        }
        try {
            this.reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        } catch (IOException e) {
            System.out.println("Couldn't create client socket reader");
        }
        System.out.println("Connected with socket, port: "
                + clientSocket.getPort()
                + ", address: "
                + clientSocket.getInetAddress());
    }

    @Override
    public String read() throws IOException{
        return reader.readLine();
    }

    @Override
    public void write(String message) {
        writer.println(message);
    }

    @Override
    public InetAddress getInetAddress() {
        return socketData.getAddress();
    }

    @Override
    public int getPort() {
        return socketData.getPort();
    }

    @Override
    public Protocol getProtocol() {
        return Protocol.TCP;
    }

    @Override
    public SocketData getSocketData() {
        return this.socketData;
    }
}
