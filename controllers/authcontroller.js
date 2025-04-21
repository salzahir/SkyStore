const db = require('../db/queries');

async function handleLogin(req, res) { 
    const {username, password} = req.body;

    console.log("Login attempt with username:", username);
    console.log("Login attempt with password:", password);
    const user = await db.getLoginUser(username, password);
    if (user) {
        req.session.user = user;
    }
    else {
        res.status(401).send('Invalid username or password');
    }
}

module.exports = {
    handleLogin
};