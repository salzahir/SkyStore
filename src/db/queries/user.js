import prisma from './prisma.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';
import { devLog } from '../../utils/devlog.js';

async function getLoginUser(username, password) {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
        devLog("User not found, username:", username);
        return null;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        devLog("Password does not match for user:", username);
        return null;
    }
    
    devLog("User found:", user);
    return user;
}

async function postRegisterUser(username, name, email, password) {
    const hashedPwd = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name: name,
            username: username,
            email: email,
            password: hashedPwd,
        }
    })
    return user;
}

async function getUsers() {
    try {
        devLog("Fetching all users...");
        const users = await prisma.user.findMany();
        devLog(`${users.length} users found`);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function deleteUsers() {
    try {
        devLog("Deleting all files...");
        await prisma.file.deleteMany();
        const result = await prisma.user.deleteMany();
        devLog(`${result.count} users deleted`);
        return result;
    } catch (error) {
        console.error("Error deleting users:", error);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Error fetching user by email");
    }
}

async function resetPassword(email, newPassword) {
    try {
        const hashedPwd = await hashPassword(newPassword);
        const user = await prisma.user.update({
            where: { email },
            data: { password: hashedPwd }
        });
        devLog("Password reset for user:", user);
        await clearResetToken(email);
        return user;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw new Error("Error resetting password");
    }
}

async function clearResetToken(email) {
    return prisma.user.update({
        where: { email },
        data: {
            token: null,
            tokenExpire: null
        }
    });
}

async function getUserByToken(hashedToken) {
    try {
      return await prisma.user.findUnique({where: { token: hashedToken }});
    } catch (err) {
      console.error("Error fetching user by token:", err);
      throw new Error("Error fetching user by token");
    }
  }

async function updateUserToken(email, token, tokenExpiration) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: {
                token: token,
                tokenExpire: tokenExpiration
            }
        });
        devLog("User token updated:", user);
        return user;
    } catch (error) {
        console.error("Error updating user token:", error);
        throw new Error("Error updating user token");
    }
}

export { getLoginUser, postRegisterUser, getUserByEmail, resetPassword, updateUserToken, getUserByToken, getUsers, deleteUsers };