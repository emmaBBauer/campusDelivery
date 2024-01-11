var express = require('express');
const cors = require('cors');//-----
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require("./routes/index");
var userRouter = require('./routes/userBackend');
var orderingRouter = require('./routes/orderingBackend');
var deliveryRouter = require('./routes/deliveryBackend');
var shopRouter = require('./routes/shopBackend');


//Hallihallo !!!!! :)





var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());//-----


app.use("/",indexRouter);
app.use('/user', userRouter);
app.use('/order', orderingRouter);
app.use('/delivery', deliveryRouter);
app.use('/shops', shopRouter);


app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});

module.exports = app;
