const db = require('../db/queries');
const { validationResult } = require('express-validator');

// This function checks if the user is authenticated
// middle ware for routes that require authentication
function ensureAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

// This function handles the login process
// It checks the username and password against the database
async function handleLogin(req, res) { 
    const {username, password} = req.body;
    const user = await db.getLoginUser(username, password);

    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
        console.log("User logged in:", user);
    }
    else {
        console.log("Invalid username or password");
        res.status(401).render('login', {
            csrfToken: req.csrfToken(),
            errors: [{msg: "Invalid username or password"}],
            old: req.body
        });
    }
}

// This function handles the logout process
async function handleLogout(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log("User logged out");
        res.redirect('/');
    });
}

async function handleRegister(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('register', {
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            old: req.body 
        });
    }
    
    const {username, name, email, password} = req.body;
    try {
        const user = await db.postRegisterUser(username, name, email, password)
        console.log("User sucessfully registered:", user);
        res.redirect('/');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
}

module.exports = {
    ensureAuth,
    handleLogin,
    handleLogout,
    handleRegister,
};