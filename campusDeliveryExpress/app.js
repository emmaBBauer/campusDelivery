var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require("./routes/index");
var userRouter = require('./routes/userBackend');
var orderingRouter = require('./routes/orderingBackend');
var deliveryRouter = require('./routes/deliveryBackend');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/",indexRouter);
app.use('/user', userRouter);
app.use('/order', orderingRouter);
app.use('/delivery', deliveryRouter);

module.exports = app;
