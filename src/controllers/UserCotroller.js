const User = require("../models/User");

module.exports = {
  async index(request, response) {
    users = await User.find();
    return response.json(users);
  },

  async store(request, response) {
    const { email, password, name, birthday, gender } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        password,
        name,
        birthday,
        gender
      });
    }

    return response.json(user);
  }
};
