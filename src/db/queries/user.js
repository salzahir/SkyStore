import prisma from './prisma.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';

async function getLoginUser(username, password) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (user && await comparePassword(password, user.password)) {
        return user;
    } else {
        return null;
    }
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
        console.log("Fetching all users...");
        const users = await prisma.user.findMany();
        users.forEach(user => {
            console.log(`User ID: ${user.id}, Username: ${user.username}, Name: ${user.name}, Email: ${user.email}`);
        });
        console.log(`${users.length} users found`);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function deleteUsers() {
    try {
        console.log("Deleting all files...");
        await prisma.file.deleteMany();

        console.log("Deleting all users...");
        const result = await prisma.user.deleteMany();

        console.log(`${result.count} users deleted`);
        return result;
    } catch (error) {
        console.error("Error deleting users:", error);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Error fetching user by email");
    }
}

export { getLoginUser, postRegisterUser, getUserByEmail };