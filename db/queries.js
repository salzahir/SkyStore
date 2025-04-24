const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require('../utils/hash');  // Corrected the import path

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

module.exports = {
    getLoginUser,
    postRegisterUser,
    insertFile
};