// app.js

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { fileURLToPath } from 'url';
import csrfMiddleware from './src/utils/csrf.js';
import authRoutes from './src/routes/authroutes.js';
import uploadRoutes from './src/routes/uploadroutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.use(csrfMiddleware);
import './src/db/passportconfig.js';

app.use(passport.initialize());
app.use(passport.session());

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", authRoutes);
app.use("/", uploadRoutes);

export { app, PORT }