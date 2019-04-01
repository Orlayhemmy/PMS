import express from 'express';

const app = express();

app.listen('8888', () => {
  console.log('Server started on port 8888')
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  return res.status(200).send({ message: 'Welcome' })
});

export default app;
