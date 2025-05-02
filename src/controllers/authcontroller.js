import * as userDb from '../db/queries/user.js';
import * as fileDb from '../db/queries/file.js';
import handleValidationErrors from '../utils/error.js';
import resend from "../services/resend.js";

// This function checks if the user is authenticated
// Middleware for routes that require authentication
function ensureAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

// This function handles the login process
// It checks the username and password against the database
async function handleLogin(req, res) {
    const { username, password } = req.body;
    const user = await userDb.getLoginUser(username, password); 

    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
        console.log("User logged in:", user);
    }
    else {
        console.log("Invalid username or password");
        res.status(401).render('login', {
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Invalid username or password" }],
            old: req.body
        });
    }
}

// This function handles the logout process
async function handleLogout(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        console.log("User logged out");
        res.redirect('/');
    });
}

async function handleRegister(req, res) {
    const validationError = handleValidationErrors(req, res, 'register');
    if (validationError) {
        return validationError;
    }

    const { username, name, email, password } = req.body;
    try {
        const user = await userDb.postRegisterUser(username, name, email, password);
        console.log("User successfully registered:", user);
        res.redirect('/');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
}

async function handleDeleteFile(req, res) {
    const fileId = req.body.fileId;
    try {
        await fileDb.deleteFile(fileId);
        console.log("File deleted successfully");
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).send('Error deleting file');
    }
}

async function handleRecoverPassword(req, res) {
    const { email } = req.body;
    try {
        const user = await userDb.getUserByEmail(email);
        if (user) {
            await resend(email);
            console.log("Recovery email sent to:", email);
            res.render("forgot"
                , {
                    csrfToken: req.csrfToken(),
                    errors: [],
                    old: {},
                    message: "Recovery email sent. Please check your inbox."
                }
            )
        } else {
            console.log("Email not found");
            res.status(404).render(
                'forgot', {
                csrfToken: req.csrfToken(),
                errors: [{ msg: "Email not found" }],
                old: req.body,
                message: null
            });
            console.log("Done rendering");
        }
    } catch (error) {
        console.error("Error recovering password:", error,message);
        res.status(500).send('Error recovering password');
    }
}

export {
    ensureAuth,
    handleLogin,
    handleLogout,
    handleRegister,
    handleDeleteFile,
    handleRecoverPassword
}