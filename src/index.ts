//using node express framework
const dotenv =  require('dotenv');
const express = require('express');
//cross origin resource sharing package
const cors =  require('cors');
//to extract/parse the body of incoming request
const bodyParser = require('body-parser');
const loggers = require("./common/logger");
const app = express();
const env = dotenv.config();
const message = require('./common/messages')
//for enabling all type cross origin packages
app.use(cors());
// to extract json data and make it readable
app.use(bodyParser.json());
//api routes
const apiLargestNo = require('./routes/api-largestNo');
//largestno realted apis goes here
app.use('/api-get-no' , apiLargestNo);
//port from env
const port = process.env.API_SERVER_PORT || 3005;
const server = app.listen(`${port}`, "0.0.0.0", function () {
  console.log(`${message.connectionMesage} ${port}`)
  loggers.info(`${message.connectionMesage} ${port}`);
})