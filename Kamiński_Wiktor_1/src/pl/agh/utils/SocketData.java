package pl.agh.utils;

import java.net.DatagramPacket;
import java.net.InetAddress;

public class SocketData {
    private InetAddress address;

    public void setPort(int port) {
        this.port = port;
    }

    private int port;

    public SocketData(DatagramPacket packet){
        this.address = packet.getAddress();
        this.port = packet.getPort();
    }

    public SocketData(InetAddress address, int port){
        this.address = address;
        this.port = port;
    }

    public InetAddress getAddress() {
        return address;
    }

    public int getPort() {
        return port;
    }

    @Override
    public boolean equals(Object other){
        if(other instanceof SocketData){
            SocketData casted = (SocketData)other;
            return casted.getPort() == this.getPort() && casted.getAddress().equals(this.getAddress());
        }
        return false;
    }
}
