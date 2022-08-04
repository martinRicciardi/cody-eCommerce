const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const ck = require('ckey');

module.exports = passport.use(new Strategy(
    {
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: ck.SECRET_KEY
    }, (payload, done) => {
        User.findOne({ _id: payload.id })
            .then(user => {
                if (user) {
                    return done(null, user)
                } else if (error) {
                    console.log(error);
                    return done(error, null);
                } else {
                    return done(null, null)
                }
            })
            .catch(error => {
                console.log(error);
                return done(error, null)
            })
    }
))
