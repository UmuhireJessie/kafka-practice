import model from '../database/models';
import postKafka from '../helper/producerKafka'

const User = model.User;

const addUser = async (req, res) => {
    const { name, email } = req.body;
  
    if (name === '' || email === '' ) {
      return res.status(400).json({
        message: 'required_field',
      });
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.status(400).json({
        message: 'email_invalid',
      });
    }
    User.findOne({
      where: {
        email,
      },
    }).then((emailExists) => {
      if (emailExists) {
        return res.status(400).json({
          status: 'fail',
          message: 'email_exists',
        });
      }
      return User.create({
        name,
        email,
      })
        .then((data) => {
          if (data) {
            // const payload = [
            //   {
                
            //     messages: JSON.stringify({ data }),
            //   },
            // ];
            postKafka(data)
            res.status(201).json({
              status: 'success',
              data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            status: 'error',
            error: err.message,
          });
        });
    });
  };

export { addUser }
  