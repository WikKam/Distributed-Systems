package pl.agh.admin;

import com.rabbitmq.client.*;
import pl.agh.utils.Exchange;
import pl.agh.utils.Queue;

import java.io.IOException;
import java.util.Scanner;

public class Admin implements Runnable {
    private final Channel channel;
    private Scanner scanner = new Scanner(System.in);
    private Queue orderQueue;
    private Queue confirmationQueue;

    private void declareExchanges() throws IOException {
        this.channel.exchangeDeclare(Exchange.ORDERS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.CONFIRMATIONS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.ADMIN.name(), BuiltinExchangeType.TOPIC);
    }

    public Admin(Connection connection) throws IOException {
        this.channel = connection.createChannel();
        declareExchanges();
        Consumer consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println(message);
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        this.orderQueue = new Queue("ADMIN_ORDERS", Exchange.ORDERS.name(), "#", channel, consumer);
        this.confirmationQueue = new Queue("ADMIN_CONFIRMATIONS", Exchange.CONFIRMATIONS.name(), "#", channel, consumer);
    }

    private void sendMessage(String message, String key){
        try {
            this.channel.basicPublish(Exchange.ADMIN.name(),
                    key,
                    null,
                    message.getBytes()
            );
        } catch (IOException e) {
            System.out.println("Nie udało się wysłać wiadomości");
        }
    }

    @Override
    public void run(){
        try {
            this.orderQueue.consume();
            this.confirmationQueue.consume();
        } catch (IOException e) {
            System.out.println("Nie udało się odczytać wiadomości");
        }
        while (true){
            String message = scanner.nextLine();
            String key = "";
            String target = "";

            if(message.contains("-T ")){
                String parsed = message.replace("-T ", "");
                sendMessage(parsed, "admin.teams");
            }
            else if(message.contains("-P ")){
                String parsed = message.replace("-P ", "");
                sendMessage(parsed, "admin.providers");
            }
            else if(message.contains("-A ")){
                String parsed = message.replace("-A ", "");
                sendMessage(parsed, "admin.providers");
                sendMessage(parsed, "admin.teams");
            }
        }
    }
}
