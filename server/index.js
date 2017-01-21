import express from 'express';
import path from 'path';
import { dbConfig, middlewaresConfig } from './config';

import { urlRoute } from './modules';

const app = express();

const PORT = process.env.PORT || 3000;

let mongoConf;

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');

  app.use(webpackMiddleware(webpack(webpackConfig)));
  mongoConf = 'mongodb://localhost/shorturltuto';
} else {
  app.use(express.static('dist'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  mongoConf = process.env.MONGO_URL;
}

/*
* DATABASE
*/
dbConfig(mongoConf);

/**
* MIDDLEWARES
*/
middlewaresConfig(app);

app.get('/api/v1/hello', (req, res) => {
  res.send('Hello World!!!');
});

app.use([urlRoute]);

app.listen(PORT, err => {
  if (err) { return console.error(err); }

  console.log(`App listen to port ${PORT}`);
});
