package pl.agh.client;

import pl.agh.utils.MulticastAdapter;
import pl.agh.utils.TcpAdapter;
import pl.agh.utils.UdpAdapter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class WriteTask implements Runnable {
    private final BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in));
    private final TcpAdapter tcpAdapter;
    private final UdpAdapter udpAdapter;
    private final MulticastAdapter multicastAdapter;

    public WriteTask(TcpAdapter tcpAdapter, UdpAdapter udpAdapter, MulticastAdapter multicastAdapter) throws IOException {
        this.tcpAdapter = tcpAdapter;
        this.udpAdapter = udpAdapter;
        this.multicastAdapter = multicastAdapter;
        System.out.println("Write task created successfully!");
    }

    @Override
    public void run() {
        while (true){
            try {
                String message = consoleReader.readLine();
                if(message.startsWith("-U ")){
                    udpAdapter.write(message.replace("-U ", ""));
                }
                else if(message.startsWith("-M ")){
                    multicastAdapter.write(message.replace("-M ", ""));
                }
                else{
                    tcpAdapter.write(message);
                }
            } catch (IOException e) {
                System.out.println("Couldn't write to socket");
                return;
            }
        }
    }
}
