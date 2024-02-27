import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-app",
  brokers: ["localhost:9092", "localhost:9093"],
});

const postKafka = async (topic, payload) => {
  const producer = kafka.producer();

  await producer.connect();
  await producer
    .send({
      topic,
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
