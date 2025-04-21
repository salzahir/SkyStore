const db = require('../db/queries');

// This function handles the login process
// It checks the username and password against the database
async function handleLogin(req, res) { 
    const {username, password} = req.body;

    console.log("Login attempt with username:", username);
    console.log("Login attempt with password:", password);
    const user = await db.getLoginUser(username, password);
    if (user) {
        req.session.user = user;
        console.log("User found:", user);
        return res.render('index', {
            user: req.session.user || null,
            csrfToken: req.csrfToken()
        });
    }
    else {
        res.status(401).send('Invalid username or password');
    }
}

module.exports = {
    handleLogin
};