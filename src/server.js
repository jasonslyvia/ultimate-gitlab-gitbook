import express from 'express';
import bodyParser from 'body-parser';

import webhookCallback from './webhook';

const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.sendStatus(200);

  webhookCallback(req.body, {});
});

app.listen(5823, () => {
  console.log('App listening on 5823');
});
