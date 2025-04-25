const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require('../utils/hash'); 

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

async function insertFile({ name, fileType, url, folderId }) {
    const file = await prisma.file.create({
        data: {
            name,
            fileType,
            url,
            folderId
        }
    });
    return file;
}

async function getFiles() {
    try {
        console.log("Fetching all files...");
        const files = await prisma.file.findMany();
        console.log(`${files.length} files found`);
        return files;
    } catch (error) {
        console.error("Error fetching files:", error);
    }
}

async function deleteAllFiles() {
    try {
        console.log("Deleting all files...");
        const files = await prisma.file.deleteMany();
        console.log(`${files.count} files deleted`);
        return files;
    } catch (error) {
        console.error("Error deleting files:", error);
    }
}

module.exports = {
    getLoginUser,
    postRegisterUser,
    insertFile,
    getFiles
};