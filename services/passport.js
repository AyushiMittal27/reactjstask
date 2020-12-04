const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  console.log(user.id, "user");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // already a record with the given profile ID
        return done(null, existingUser);
      }
      //  dont't have a user with this profile id
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.fbClientID,
      clientSecret: keys.fbClientSecret,
      callbackURL: "/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        // already a record with the given profile ID
        return done(none, existingUser);
      }
      const user = await new User({ facebookId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(async (phonenum, countrycode, done) => {
    console.log("phonenum ", phonenum);

    const existingUser = await User.findOne({
      phonenum: phonenum,
      countrycode: countrycode,
    });
    if (existingUser) {
      return done(none, existingUser);
    }
    const user = await new User({
      phonenum: phonenum,
      countrycode: countrycode,
    }).save();
    done(null, user);
  })
);
