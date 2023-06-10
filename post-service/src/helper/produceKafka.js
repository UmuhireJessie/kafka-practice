import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-app",
  brokers: ["localhost:9092"],
});

const postKafka = async (payload) => {
  const producer = kafka.producer();

  await producer.connect();
  await producer
    .send({
      topic: 'user-topic',
      messages: [{ value: JSON.stringify(payload) }],
    })
    .then(() => {
      console.log("Message sent to Kafka");
    })
    .catch((error) => {
      console.error("Error while sending message to Kafka:", error);
    });

  await producer.disconnect();
};

export default postKafka;