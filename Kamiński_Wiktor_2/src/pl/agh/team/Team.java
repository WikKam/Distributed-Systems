package pl.agh.team;

import com.rabbitmq.client.*;
import pl.agh.utils.Exchange;
import pl.agh.utils.Queue;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Team implements Runnable {
    private final String teamName;
    private final Channel channel;
    private final Scanner scanner = new Scanner(System.in);
    private final Queue confirmationQueue;
    private final Queue adminQueue;

    private void declareExchanges() throws IOException {
        this.channel.exchangeDeclare(Exchange.ORDERS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.CONFIRMATIONS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.ADMIN.name(), BuiltinExchangeType.TOPIC);
    }

    public Team(String teamName, Connection connection) throws IOException {
        this.teamName = teamName;
        this.channel = connection.createChannel();
        declareExchanges();
        Consumer confirmationConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println("Otrzymano potwierdzenie zamówienia: " + message);
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        Consumer adminConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println("[ADMIN]: " + message);
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        this.confirmationQueue = new Queue(teamName,
                Exchange.CONFIRMATIONS.name(),
                this.channel,
                confirmationConsumer
        );
        this.adminQueue = new Queue("admin.teams." + teamName, Exchange.ADMIN.name(), "admin.teams", this.channel, adminConsumer);
    }

    public void makeOrders() throws IOException {
        System.out.println("Podaj produkty, który chcesz zamówić");
        List<String> orderItems = Arrays.asList(scanner.nextLine().split(" "));
        for (String orderItem : orderItems){
            String message = teamName + " " + orderItem;
            this.channel.basicPublish(Exchange.ORDERS.name(), orderItem, null, message.getBytes());
        }
    }


    @Override
    public void run() {
        try {
            this.confirmationQueue.consume();
            this.adminQueue.consume();
        } catch (IOException e) {
            System.out.println("nie udało się otrzymać potwierdzeń zamówienia");
        }
        while (true){
            try{
                makeOrders();
            } catch (IOException e){
                System.out.println("Nie udało się złożyć zamówienia");
                return;
            }
        }
    }
}
