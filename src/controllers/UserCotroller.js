const User = require("../models/User");
const bcrypt = require("bcrypt");

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
        let hash = bcrypt.hashSync(password, 10);
        user = await User.create({
          email,
          password: hash,
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
  },

  async login(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) return response.status(404).json({ error: "User not found" });

    if (bcrypt.compareSync(password, user.password)) {
      return response.json(user);
    } else {
      return response.status(400).json({ error: "Invalid password" });
    }
  }
};
