// viewscontroller.js

// View controller for rendering views
// This module handles rendering views for the application.


const db = require('../db/queries.js');

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
        const files = await db.getFiles();
        console.log("Files fetched successfully:", files);

        return res.render('dashboard', {
            user: req.session.user,
            files: files,
            csrfToken: req.csrfToken()
        });
    } catch (err) {
        console.error("Error fetching files:", err);
        return res.status(500).send('Failed to load dashboard');
    }
}

module.exports = {
    renderRoot,
    renderLogin,
    renderDashboard,
    renderRegister,
    renderTerms
};