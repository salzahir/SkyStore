// viewscontroller.js

// View controller for rendering views
// This module handles rendering views for the application.

// General Pages

// for "/" route
function renderRoot(req, res) {
    if(!req.session.user) {
        return res.render('login', {
            csrfToken: req.csrfToken(),
            errors: [],
            old: {}
        });
    }
    return res.render('dashboard', {
        user: req.session.user,
        csrfToken: req.csrfToken()
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

// User Pages
function renderDashboard(req, res) {
    return res.render('dashboard', {
        user: req.session.user,
        csrfToken: req.csrfToken()
    });
}

module.exports = {
    renderRoot,
    renderLogin,
    renderDashboard,
    renderRegister,
    renderTerms
};