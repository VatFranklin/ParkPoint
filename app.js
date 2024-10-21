// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // Import express-session
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configure express-session
app.use(
  session({
    secret: '8e7d6b35bfb488b13591e4c16bb1363353436584df45d48cd2b58627d8ddda02709b06a0497d9e8b98c18747796e706e0d6f3739ade2c7fefe229cfd0bdc8d5c', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false ,
      maxAge: 1000 * 60 * 60 * 24
    }, // Set to true if using https
  })
);

// Routes
const indexRouter = require('./routes/index');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const bookingsRouter = require('./routes/bookings');
const logoutRouter = require('./routes/logout');
const spotsRouter = require('./routes/spots');

app.use(indexRouter);
app.use(registrationRouter);
app.use(loginRouter);
app.use('/dashboard', dashboardRouter);
app.use(bookingsRouter);
app.use(logoutRouter);
app.use(spotsRouter); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
