import kafka from 'kafka-node';

// Configure Kafka client
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(client, [{ topic: 'user-topic' }]);

// Listen to Kafka messages
consumer.on('message', (message) => {
  const userPayload = JSON.parse(message.value);

  // Associate user with the created post
  // ...
});

consumer.on('error', (error) => {
  console.error('Error while consuming Kafka message:', error);
});