// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Utility function to compare password
async function comparePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

export { hashPassword, comparePassword };