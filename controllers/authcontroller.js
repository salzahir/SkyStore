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

module.exports = {
    handleLogin,
    handleLogout
};