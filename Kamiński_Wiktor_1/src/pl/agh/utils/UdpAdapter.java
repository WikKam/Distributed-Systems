package pl.agh.utils;

import java.io.IOException;
import java.net.*;
import java.util.Arrays;

public class UdpAdapter implements ProtocolAdapter {

    private final SocketData socketData;
    private final boolean serverSide;

    public DatagramSocket getUdpServerSocket() {
        return udpServerSocket;
    }

    private final DatagramSocket udpServerSocket;

    public UdpAdapter(Socket socket, DatagramSocket udpServerSocket) throws UnknownHostException {
        this.socketData = new SocketData(socket.getInetAddress(), socket.getPort());
        this.serverSide = false;
        this.udpServerSocket = udpServerSocket;
    }

    public UdpAdapter(DatagramSocket udpServerSocket) throws UnknownHostException {
        this.socketData = new SocketData(InetAddress.getByName("localhost"), -1);
        this.serverSide = true;
        this.udpServerSocket = udpServerSocket;
    }

    @Override
    public String read() throws IOException {
        byte[] receiveBuffer = new byte[2048];
        Arrays.fill(receiveBuffer, (byte)0);
        DatagramPacket receivePacket = new DatagramPacket(receiveBuffer, receiveBuffer.length);
        udpServerSocket.receive(receivePacket);
        if(serverSide){
            socketData.setPort(receivePacket.getPort());
        }
        return new String(receivePacket.getData());
    }

    @Override
    public void write(String message) {
        write(message, this.socketData.getPort());
    }

    public void write(String message, int port){
        byte[] responseBytes = message.getBytes();
        try {
            udpServerSocket.send(new DatagramPacket(responseBytes,
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
        return socketData.getAddress();
    }

    @Override
    public int getPort() {
        return socketData.getPort();
    }

    @Override
    public Protocol getProtocol() {
        return Protocol.UDP;
    }

    @Override
    public SocketData getSocketData() {
        return this.socketData;
    }
}
