// viewscontroller.js

// View controller for rendering views
// This module handles rendering views for the application.

import * as db from '../db/queries/file.js';
import * as userDb from '../db/queries/user.js';

// General Pages

// for "/" route
function renderRoot(req, res) {
    return res.render('index', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {}
    });
}

function renderTerms(req, res) {
    return res.render('terms', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {}
    });
}

// Auth Pages
function renderLogin(req, res) {
    return res.render('login', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {}
    });
}

function renderRegister(req, res) {
    return res.render('register', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {}
    });
}

async function renderDashboard(req, res) {
    try {
        const user = req.session.user;
        const files = await db.getUserFiles(user.id);
        return res.render('dashboard', {
            user: user,
            files: files,
            errors: [],
            old: {},
            message: req.query.message || null,
            csrfToken: req.csrfToken()
        });
    } catch (err) {
        console.error("Error fetching files:", err);
        return res.status(500).send('Failed to load dashboard');
    }
}

async function renderFile(req, res) {
    const fileID = req.params.id;
    const file = await db.getFileById(fileID);

    if (!file) {
        return res.status(404).send('File not found');
    }
    return res.render('file', {
        user: req.session.user,
        csrfToken: req.csrfToken(),
        file: file,
        errors: [],
        old: {}
    });
}

function renderForgotPassword(req, res) {
    return res.render('forgot', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {},
        message: null
    });
}
import crypto from 'crypto';

async function renderResetPassword(req, res) {
    const { token } = req.params;

    if (!token) {
        return res.status(400).send('Invalid reset link');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await userDb.getUserByToken(hashedToken);

    if (!user || user.tokenExpire < new Date()) {
        return res.status(400).send('Invalid or expired token');
    }
    const email = user.email;

    return res.render('reset', {
        csrfToken: req.csrfToken(),
        errors: [],
        old: {},
        message: null,
        token,
        email
    });
}

export {
    renderRoot,
    renderLogin,
    renderDashboard,
    renderRegister,
    renderTerms,
    renderFile,
    renderForgotPassword,
    renderResetPassword
};