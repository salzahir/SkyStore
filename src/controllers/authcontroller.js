import * as userDb from '../db/queries/user.js';
import * as fileDb from '../db/queries/file.js';
import handleValidationErrors from '../utils/error.js';
import resend from "../services/resend.js";
import { devLog } from '../utils/devlog.js';
import crypto from 'crypto';

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
        devLog("User logged in:", user);
    }
    else {
        devLog("Invalid login attempt:", username);
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
        devLog("User logged out");
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
        devLog("User registered:", user);
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
        devLog("File deleted:", fileId);
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).send('Error deleting file');
    }
}


async function sendRecoveryEmail(email){
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60); 
    await userDb.updateUserToken(email, hashedToken, tokenExpiry);
    const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://skystore-szkk.onrender.com"
      : "http://localhost:3000";
      const resetLink = `${baseUrl}/reset-password/${rawToken}`;
      await resend(email, resetLink);
}

async function handleRecoverPassword(req, res) {
    const { email } = req.body;
    try {
        const user = await userDb.getUserByEmail(email);
        if (user) {
            await sendRecoveryEmail(email);
            devLog("Recovery email sent to:", email);
            res.render("forgot"
                , {
                    csrfToken: req.csrfToken(),
                    errors: [],
                    old: {},
                    message: "Recovery email sent. Please check your inbox."
                }
            )
        } else {
            devLog("Email not found:", email);
            res.status(404).render(
                'forgot', {
                csrfToken: req.csrfToken(),
                errors: [{ msg: "Email not found" }],
                old: req.body,
                message: null
            });
        }
    } catch (error) {
        console.error("Error recovering password:", error,message);
        res.status(500).send('Error recovering password');
    }
}

async function handleResetPasword(req, res) {
    const { token } = req.params;
    const { password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) { 
        return res.status(400).render('reset', {
            csrfToken: req.csrfToken(),
            errors: [{ msg: "Passwords do not match" }],
            old: req.body,
            message: null,
            token,
        });
    }

    if (!token) {
        return res.status(400).send('Invalid reset link');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await userDb.getUserByToken(hashedToken);

    if (!user || user.tokenExpire < new Date()) {
        return res.status(400).send('Invalid or expired token');
    }

    try {
        await userDb.resetPassword(user.email, password);
        devLog("Password reset for user:", user.email);
        res.redirect('/login');
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send('Error resetting password');
    }
}

export {
    ensureAuth,
    handleLogin,
    handleLogout,
    handleRegister,
    handleDeleteFile,
    handleRecoverPassword,
    handleResetPasword
}