package pl.agh.provider;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import pl.agh.team.Team;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

public class Main {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Podaj nazwę dostawcy: ");
        String name = scanner.nextLine();
        System.out.println("Podaj produkty obsługiwane przez producenta: ");
        List<String> products = Arrays.asList(scanner.nextLine().split(" "));
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        try {
            Connection connection = factory.newConnection();
            Provider provider = new Provider(products, connection, name);
            provider.run();
        } catch (IOException e) {
            System.out.println("Nie udało się stworzyć kanału");
        } catch (TimeoutException e) {
            System.out.println("Nie udało się nawiązać połączenia");
        }
    }
}
