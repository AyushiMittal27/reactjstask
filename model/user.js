const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  phonenum: String,
  countrycode: String,
});

mongoose.model("user", userSchema);
