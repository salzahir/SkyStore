// app.js
const express = require('express');
const path = require('path');
const app = express();

// Config 
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
const csrfMiddleware = require('./utils/csrf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS
    })
);

app.use(csrfMiddleware);
const passport = require('passport');
require('./db/passportconfig'); 

// const flash = require('connect-flash');

app.use(passport.initialize());
app.use(passport.session());

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authroutes');
const uploadRoutes = require('./routes/uploadroutes');

app.use("/", authRoutes);
app.use("/", uploadRoutes);

module.exports = app;