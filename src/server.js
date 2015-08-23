import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.post('/hook', (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

app.listen(5823, () => {
  console.log('App listening on 5823');
});
