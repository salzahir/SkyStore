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

export { getLoginUser, postRegisterUser };