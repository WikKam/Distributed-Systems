package pl.agh.team;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

public class Main {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Podaj nazwę drużyny: ");
        String teamName = scanner.nextLine();
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        try {
            Connection connection = factory.newConnection();
            Team team = new Team(teamName, connection);
            team.run();
        } catch (IOException e) {
            System.out.println("Nie udało się stworzyć kanału");
            e.printStackTrace();
        } catch (TimeoutException e) {
            System.out.println("Nie udało się nawiązać połączenia");
        }
    }
}
