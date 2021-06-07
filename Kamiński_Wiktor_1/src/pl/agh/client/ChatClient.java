package pl.agh.client;

import pl.agh.utils.MulticastAdapter;
import pl.agh.utils.TcpAdapter;
import pl.agh.utils.UdpAdapter;

import java.io.IOException;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ChatClient {
    private final int portNumber = 12345;
    private int multicastPort = 21379;
    private final String hostName = "localhost";
    private final Socket socket;
    private final DatagramSocket datagramSocket;
    private final MulticastSocket multicastSocket;
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    private final InetAddress multicastGroup;

    public Socket getSocket() {
        return socket;
    }

    public DatagramSocket getDatagramSocket() {
        return datagramSocket;
    }

    public ChatClient() throws IOException {
        socket = new Socket(hostName, portNumber);
        //socket.setReuseAddress(true);
        System.out.println(socket.getLocalPort());
        datagramSocket = new DatagramSocket(socket.getLocalPort());
        this.multicastSocket = new MulticastSocket(multicastPort);
        this.multicastGroup = InetAddress.getByName("230.0.0.0");
        System.out.println("Connected to the server on port " + socket.getPort() + "!");
    }

    public void start() throws IOException {
        TcpAdapter tcpAdapter = new TcpAdapter(socket);
        UdpAdapter udpAdapter = new UdpAdapter(socket, datagramSocket);
        MulticastAdapter multicastAdapter =
                new MulticastAdapter(multicastSocket, multicastGroup, socket);
        executorService.submit(new WriteTask(tcpAdapter, udpAdapter, multicastAdapter));
        executorService.submit(new ReadTask(tcpAdapter));
        executorService.submit(new ReadTask(udpAdapter));
        executorService.submit(new ReadTask(multicastAdapter));
    }

    public MulticastSocket getMulticastSocket() {
        return multicastSocket;
    }

    public InetAddress getMulticastGroup() {
        return multicastGroup;
    }
}
