require('dotenv').config();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.js');
const mongoose = require('mongoose');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: path.join('frontend', 'src'),
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});
const carNumberPlateRoutes = require('./routes/carNumberPlates');

mongoose.connect(process.env.DATABASE_URL);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(( req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ( req.method === "OPTIONS" ) {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use('/api/car-number-plates', carNumberPlateRoutes);
app.get('*', ( req, res ) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '..', 'frontend', 'dist', 'index.html')));
  res.end();
});

app.listen(port, error => {
  if ( error ) {
    return console.error(error);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});