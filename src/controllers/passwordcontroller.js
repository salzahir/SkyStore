import resend from "../services/resend.js";
import crypto from 'crypto';
import * as userDb from '../db/queries/user.js';
import { devLog } from '../utils/devlog.js';

async function sendRecoveryEmail(email) {
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
            res.redirect('/forgot-password?message=Recovery email sent. Please check your inbox.');
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
        console.error("Error recovering password:", error);
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
    handleRecoverPassword,
    handleResetPasword
}