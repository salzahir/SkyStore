import passport from 'passport';
import strategy from './strategy.js';
import { devLog } from '../utils/devlog.js';

passport.use(strategy)

passport.serializeUser((user, done) => {
    devLog("Serializing user:", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log("Deserializing user:", id);
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;