import express from 'express';
import cors from 'cors';
import router from './routes/userRoute';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'welcome_message',
  });
});

app.use('/api/v1/', router);

export default app;
