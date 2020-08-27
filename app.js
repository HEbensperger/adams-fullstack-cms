const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// setup session store in Redis
const redis = require('redis');
const session = require('express-session');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.unref();
redisClient.on('error', console.log);

// setup connection to mongodb
require('./models/User');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// require passport service for SF Auth
require('./services/passport');

const indexRouter = require('./routes/index');

const app = express();
// always wear a helmet
app.use(helmet());

// configure session store in Redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDISSECRET,
    resave: false,
    cookie: {
      maxAge: 72000000
    },
    saveUninitialized: true
  })
);

// wire up passport for use
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;