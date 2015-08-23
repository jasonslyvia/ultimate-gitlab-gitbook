import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import webhookCallback from './webhook';

const logStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

const app = express();

// Logging
app.use(morgan('combined', {stream: logStream}));

// Parse request body
app.use(bodyParser.json());

// Response to webhook
app.post('/', (req, res) => {
  res.sendStatus(200);

  webhookCallback(req.body, {});
});

app.listen(5823, () => {
  console.log('App listening on 5823');
});
