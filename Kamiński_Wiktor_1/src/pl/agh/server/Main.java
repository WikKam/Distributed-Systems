package pl.agh.server;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        ChatServer server = null;
        try {
            server = new ChatServer();
            server.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if(server != null){
                server.getServerSocket().close();
            }
        }
    }
}
