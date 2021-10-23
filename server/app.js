var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const cors=require('cors')
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
  }))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/data', require('./routes/data'));
app.use('/columns', require('./routes/columns'));

module.exports = app;
