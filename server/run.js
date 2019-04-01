import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log('Server started on port 8888')
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  return res.status(200).send({ message: 'Welcome' })
});

export default app;
