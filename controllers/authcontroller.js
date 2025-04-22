const db = require('../db/queries');

// This function handles the login process
// It checks the username and password against the database
async function handleLogin(req, res) { 
    const {username, password} = req.body;
    const user = await db.getLoginUser(username, password);

    if (user) {
        req.session.user = user;
        return res.render('index', {
            user: req.session.user || null,
            csrfToken: req.csrfToken()
        });
    }
    else {
        res.status(401).send('Invalid username or password');
    }
}

async function handleLogout(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        console.log("User logged out");
        res.redirect('/');
    });
}

function renderRegister(req, res) {
    res.render('register', {
        csrfToken: req.csrfToken()
    });
}

async function handleRegister(req, res) {
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
    handleLogin,
    handleLogout,
    renderRegister,
    handleRegister
};