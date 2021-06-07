package pl.agh.utils;

import java.io.IOException;
import java.net.InetAddress;

public interface ProtocolAdapter {
    String read() throws IOException;
    void write(String message);
    InetAddress getInetAddress();
    int getPort();
    Protocol getProtocol();
    SocketData getSocketData();
}
