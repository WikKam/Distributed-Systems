package pl.agh.server;

import pl.agh.utils.Protocol;
import pl.agh.utils.ProtocolAdapter;
import pl.agh.utils.TcpAdapter;
import pl.agh.utils.UdpAdapter;

import java.io.IOException;
import java.net.DatagramSocket;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ChatServer {
    int portNumber = 12345;
    private final ServerSocket serverSocket;
    private final DatagramSocket udpServerSocket;
    private final ExecutorService executorService = Executors.newCachedThreadPool();

    private final List<ServerTask> tasks = new ArrayList<>();

    public ServerSocket getServerSocket(){
        return this.serverSocket;
    }

    public DatagramSocket getUdpServerSocket() {
        return this.udpServerSocket;
    }

    public ChatServer() throws IOException {
        this.serverSocket = new ServerSocket(this.portNumber);
        this.udpServerSocket = new DatagramSocket(this.portNumber);
        System.out.println("Server started on port " + this.portNumber);
    }

    public List<ServerTask> getTasks() {
        return tasks;
    }

    public void removeTask(ServerTask task){
        this.tasks.remove(task);
    }

    public void sendMessage(ServerTask task, String message){
        ProtocolAdapter taskProtocolAdapter = task.getProtocolAdapter();
        this.tasks.stream().filter(t -> {
                ProtocolAdapter currentProtocolAdapter = t.getProtocolAdapter();
                return  taskProtocolAdapter.getProtocol().equals(currentProtocolAdapter.getProtocol())
                        && !currentProtocolAdapter.getSocketData().equals(taskProtocolAdapter.getSocketData());
        }).forEach(t -> t.write(message));
    }

    public void start() throws IOException {
        UdpServerTask udpTask = new UdpServerTask(this, new UdpAdapter(udpServerSocket));
        executorService.submit(udpTask);
        while(true){
            Socket clientSocket = serverSocket.accept();
            ServerTask task = new ServerTask(new TcpAdapter(clientSocket), this);
            this.tasks.add(task);
            executorService.submit(task);
        }
    }
}
