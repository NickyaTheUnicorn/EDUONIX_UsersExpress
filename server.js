/**
 * Server.js is used to create the server instance.
 * Author: Yannick Renner
 * Created On: 02-17-2021
 */
require('dotenv').config();

const express = require('express');
const { check } = require('express-validation');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const usersRouter = require('./routes/user');


MONGO_DB_KEY = process.env.MONGO_DB_KEY;
DB_NAME = process.env.DB_NAME;

const MongoURI = `mongodb+srv://eudonix:${MONGO_DB_KEY}@meanfullstackcours.vwemt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
    .then(res => console.log('Datanse Connected'))
    .catch(err => console.error(`Error while connecting to database: ${err}`));

const store = new MongoDBSession({
    uri: MongoURI,
    collection: 'sessions',
});

const app = express();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});