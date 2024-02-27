import kafka from "./kfakaConfig";

const consumer = kafka.consumer({ groupId: "userGroup" });

const consumeKafka = (topic, groupId) => {
  return new Promise(async (resolve, reject) => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        // Commit the offset
        await consumer.commitOffsets([
          { topic, partition, offset: message.offset },
        ]);

        resolve(value);
      },
    });

    consumer.on("consumer.crash", (error) => {
      reject(error);
    });
  });
};

const stopConsumer = async () => {
  await consumer.disconnect();
  console.log("Consumer stopped");
};

export { consumeKafka, stopConsumer };
