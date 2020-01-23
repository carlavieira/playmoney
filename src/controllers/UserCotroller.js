const User = require("../models/User");
const Bcrypt = require("bcryptjs");

module.exports = {
  async index(request, response) {
    users = await User.find();
    return response.json(users);
  },

  async store(request, response) {
    const { email, password, name, birthday, gender } = request.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          password,
          name,
          birthday,
          gender
        });
        return response.status(201).json(user);
      } else {
        return response.status(400).json({ error: "User already exists" });
      }
    } catch {
      return response
        .status(400)
        .json({ message: "Registration failed", error });
    }
  }
};
