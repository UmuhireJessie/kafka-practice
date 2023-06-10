import kafka from "kafka-node";

// Configure Kafka client
const createConsumer = (topics) => {
  const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
  const consumer = new kafka.Consumer(client, topics);

  return consumer;
}

// Listen to Kafka messages
const consumeMessages = (consumer) => {
  return new Promise((resolve, reject) => {
    const messages = [];

    consumer.on("message", (message) => {
      messages.push(JSON.parse(message.value));
    });

    consumer.on("error", (error) => {
      console.error("Error while consuming Kafka message:", error);
      reject(error);
    });

    consumer.on("done", () => {
      resolve(messages);
    });
  });
};

export { createConsumer, consumeMessages }
