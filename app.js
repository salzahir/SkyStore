// app.js
const express = require('express');
const path = require('path');
const app = express();

// Config 
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
const csurf = require('csurf');
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

// CSRF protection not working for file uploads temp solution

// app.use(csurf({ cookie: true }));
app.use((req, res, next) => {
    // Provide a dummy csrfToken function
    req.csrfToken = function() { return 'dummy-csrf-token'; };
    // Make the token available to views
    res.locals.csrfToken = 'dummy-csrf-token';
    next();
  });

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