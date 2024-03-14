
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { secretOrKey } = require("./keys");
const User = require("../models/User");

const configurePassport = () => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secretOrKey;

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

module.exports = configurePassport;
