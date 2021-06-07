package pl.agh.admin;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import pl.agh.provider.Provider;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Main {
    public static void main(String[] args){
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        try {
            Connection connection = factory.newConnection();
            Admin admin = new Admin(connection);
            admin.run();
        } catch (IOException e) {
            System.out.println("Nie udało się stworzyć kanału");
        } catch (TimeoutException e) {
            System.out.println("Nie udało się nawiązać połączenia");
        }
    }
}
