import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "user-app",
  brokers: ["localhost:9092", "localhost:9093"],
  retry: {
    initialRetryTime: 3000, // Initial retry delay in milliseconds
    // retries: 10, // Maximum number of retries
    // factor: 1, // Backoff factor for retry delay
    // multiplier: 1.5, // Multiplier for retry delay
    maxRetryTime: 50000, // Maximum retry delay in milliseconds
  },
});

export default kafka;