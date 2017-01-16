import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { urlRoute } from './modules';

const app = express();

const PORT = process.env.PORT || 3000;

/*
* DATABASE
*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shorturltuto');
mongoose.connection
  .once('open', () => console.log('MONGODB connected'))
  .on('error', err => console.error(err));

/**
* MIDDLEWARES
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use([urlRoute]);

app.listen(PORT, err => {
  if (err) { return console.error(err); }

  console.log(`App listen to port ${PORT}`);
});
