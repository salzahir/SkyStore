const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const getLoginUser = require('./queries').getLoginUser;

passport.use(new LocalStrategy(async (username, password, done) => {
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
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;