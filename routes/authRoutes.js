const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const SendOtp = require("sendotp");
const keys = require("../config/keys");
const sendOtp = new SendOtp(keys.msgAPiKey);

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/profile");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/login");
  });

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      profileFields: ["id", "name"],
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/http://localhost:3000/profile");
    }
  );

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

  app.post("/api/otp", (req, res) => {
    const { num, code } = req.body;
    let mnum = `+${code}-${num}`;
    sendOtp.send(mnum, "Suffescom", function (err, data) {
      if (error) {
        return res.json({ err: "Please try again later" });
      }
      sendOtp.setOtpExpiry("5");
    });
    res.json({ msg: "OTP SEND" });
  });

  app.post(
    "/api/phonenumber/auth",
    (req, res, next) => {
      const { phonenum, countrycode, otp } = req.body;
      let number = `+${countrycode}-${phonenum}`;
      sendOtp.verify(number, otp, function (err, data) {
        if (data.type == "success") {
          next();
        } else {
          return res.json({ err: "Invalid OPT" });
        }
      });
    },
    passport.authenticate("local"),
    (req, res) => {
      res.redirect("http://localhost:3000/profile");
    }
  );
};
