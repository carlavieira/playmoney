const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken:{
    type:String,
    select: false,
  },
  passwordResetExpires:{
    type: Date,
    select: false,
  },
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  stars: {
    type: [Boolean],
    require: true,
    default: [false, false, false, false, false]
  },
  active: {
    type: Boolean,
    require: true,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
