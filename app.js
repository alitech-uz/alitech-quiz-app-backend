const express = require('express');
const path = require('path');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const session = require('express-session')
const app = express();

process.on("uncaughtException", (err) => {
  console.log(err.message);
  process.exit(1)
})
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  process.exit(1)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({ success: false, msg: err.message });
})

mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  console.log("MongoDB ga ulanish hosil qilindi...");
})
  .catch((err) => {
    throw Error("MongoDBga ulanishda xatolik yuz berdi...", err)
  });


module.exports = app;
