import { v4 as uuidv4 } from "uuid";
import model from "../database/models";
import { consumeKafka, stopConsumer } from "../helper/consumerKafka";

const Post = model.Post;

const addPost = async (req, res) => {
  const { name, description } = req.body;

  if (name === "" || description === "") {
    return res.status(400).json({
      message: "required_field",
    });
  }
  Post.findOne({
    where: {
      name,
    },
  }).then((nameExists) => {
    if (nameExists) {
      return res.status(400).json({
        status: "fail",
        message: "post_exists",
      });
    }

    // Consume messages from the topic
    consumeKafka('user-topic', "test-group" )
      .then((messages) => {
        console.log("Received messages:", JSON.parse(messages));
        stopConsumer().catch((error) => {
          console.error("Error while stopping consumer:", error);
        });
      })
      .catch((error) => {
        console.error("Error while consuming messages:", error);
      });

    return Post.create({
      name,
      description,
      user_id: uuidv4(), // this is supposed to come from kafka
    })
      .then((data) => {
        if (data) {
          res.status(201).json({
            status: "success",
            data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: "error",
          error: err.message,
        });
      });
  });
};

export { addPost };
