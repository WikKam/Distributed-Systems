package pl.agh.utils;

import java.io.IOException;
import java.net.*;
import java.util.Arrays;

public class MulticastAdapter implements ProtocolAdapter {

    private final MulticastSocket multicastSocket;
    private SocketData socketData = null;
    private final Socket mainSocket;

    public MulticastAdapter(MulticastSocket socket, InetAddress group, Socket mainSocket){
        this.multicastSocket = socket;
        this.mainSocket = mainSocket;
        try {
            socket.joinGroup(group);
            this.socketData = new SocketData(group, socket.getLocalPort());
        } catch (UnknownHostException e) {
            System.out.println("Error. Unknown host");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String read() throws IOException {
        byte[] receiveBuffer = new byte[2048];
        Arrays.fill(receiveBuffer, (byte)0);
        DatagramPacket receivePacket = new DatagramPacket(receiveBuffer, receiveBuffer.length);
        multicastSocket.receive(receivePacket);
        return new String(receivePacket.getData());
    }

    @Override
    public void write(String message) {
        byte[] responseBytes = ("[" + mainSocket.getLocalPort() + "]: " + message).getBytes();
        try {
            multicastSocket.send(new DatagramPacket(responseBytes,
                    responseBytes.length,
                    this.socketData.getAddress(),
                    this.socketData.getPort()));
        } catch (IOException e) {
            System.out.println("Unable to send udp message to socket "
                    + socketData.getPort()
                    + " "
                    + socketData.getAddress());
        }
    }

    public void write(String message, int port){
        byte[] responseBytes = ("[" + mainSocket.getLocalPort() + "] " + message).getBytes();
        try {
            multicastSocket.send(new DatagramPacket(responseBytes,
                    responseBytes.length,
                    this.socketData.getAddress(),
                    port));
        } catch (IOException e) {
            System.out.println("Unable to send udp message to socket "
                    + port
                    + " "
                    + socketData.getAddress());
        }
    }

    @Override
    public InetAddress getInetAddress() {
        return this.socketData.getAddress();
    }

    @Override
    public int getPort() {
        return this.socketData.getPort();
    }

    @Override
    public Protocol getProtocol() {
        return Protocol.UDP_MULTICAST;
    }

    @Override
    public SocketData getSocketData() {
        return this.socketData;
    }
}
