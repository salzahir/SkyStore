const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getLoginUser(username, password) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    } else {
        return null;
    }
}

async function postRegisterUser(username, name, email, password) {

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
        data: {
            name: name,
            username: username,
            email: email,
            password: hashedPassword
        }
    })
    return user;
}

module.exports = {
    getLoginUser,
    postRegisterUser
};