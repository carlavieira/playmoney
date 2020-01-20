const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  stars: [{ type: Boolean }],
  active: { type: Boolean }
});

module.exports = mongoose.model("User", UserSchema);
