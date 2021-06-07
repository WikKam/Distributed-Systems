package pl.agh.utils;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;

import java.io.IOException;

public class Queue {
    private final Channel channel;
    private final String name;
    private final Consumer consumer;

    public Queue(String name, String exchange, Channel channel, Consumer consumer) throws IOException {
        this(name, exchange, name, channel, consumer);
    }

    public Queue(String name, String exchange, String key,  Channel channel, Consumer consumer) throws IOException {
        this.name = name;
        this.channel = channel;
        this.consumer = consumer;
        this.channel.queueDeclare(name, true, false, false, null);
        this.channel.queueBind(name, exchange, key);
        System.out.println("Kolejka: " + name + " została stworzona");
    }

    public String getName(){
        return this.name;
    }

    public void consume() throws IOException {
        this.channel.basicConsume(name,false, this.consumer);
    }

}
