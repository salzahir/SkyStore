import LocalStrategy from 'passport-local';
import { getLoginUser } from './queries/user.js';

const strategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await getLoginUser(username, password);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    } catch (err) {
        return done(err);
    }
})

export default strategy;