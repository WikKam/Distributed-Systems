package pl.agh.provider;

import com.rabbitmq.client.*;
import pl.agh.utils.Exchange;
import pl.agh.utils.Queue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Provider implements Runnable {
    private Channel channel;
    private Consumer consumer;
    private List<String> availableProducts;
    private List<Queue> queues = new ArrayList<>();
    private final Random random = new Random();
    private final Queue adminQueue;
    private final String name;

    private void declareExchanges() throws IOException {
        this.channel.exchangeDeclare(Exchange.ORDERS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.CONFIRMATIONS.name(), BuiltinExchangeType.TOPIC);
        this.channel.exchangeDeclare(Exchange.ADMIN.name(), BuiltinExchangeType.TOPIC);
    }

    public Provider (List<String> availableProducts, Connection connection, String name) throws IOException {
        this.channel = connection.createChannel();
        this.name = name;
        this.availableProducts = availableProducts;
        declareExchanges();
        this.consumer = new DefaultConsumer(channel){
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String[] message = new String(body, "UTF-8").split(" ");
                String orderCode = name + "" + random.nextInt(1000000);
                System.out.println("Otrzymano zamówienie na: "
                        + message[1] +
                        " od: " + message[0] +
                        " kod zamówienia: " +
                        orderCode
                );
                channel.basicPublish(Exchange.CONFIRMATIONS.name(),
                        message[0],
                        null,
                        (orderCode + " 1x " + message[1]).getBytes());
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        for (String product : availableProducts){
            Queue queue = new Queue(product, Exchange.ORDERS.name(), this.channel, this.consumer);
            queues.add(queue);
        }
        Consumer adminConsumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                System.out.println("[ADMIN]: " + message);
                channel.basicAck(envelope.getDeliveryTag(), false);
            }
        };
        this.adminQueue = new Queue("admin.providers." + name,
                Exchange.ADMIN.name(),
                "admin.providers",
                this.channel,
                adminConsumer
        );
        this.channel.basicQos(1);
    }

    @Override
    public void run() {
        try {
            this.adminQueue.consume();
        } catch (IOException e) {
            System.out.println("Nie udało się odebrać wiadomości od admina");
        }
        for(Queue q : queues){
                try {
                    q.consume();
                } catch (IOException e) {
                    System.out.println("Nie udało się odebrać zamówienia: " + q.getName());
                }
            }
    }
}
