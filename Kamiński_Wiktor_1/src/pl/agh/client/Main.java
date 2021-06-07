package pl.agh.client;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        ChatClient client = null;
        try {
            client = new ChatClient();
            client.start();
        } catch (IOException e) {
            System.out.println("Utracono połączenie");
            //e.printStackTrace();
            if(client != null){
                client.getSocket().close();
                client.getDatagramSocket().close();
                client.getMulticastSocket().leaveGroup(client.getMulticastGroup());
            }
        }
    }
}
