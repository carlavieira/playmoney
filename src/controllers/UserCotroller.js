const User = require("../models/User");

module.exports = {
  async index(request, response) {
    users = await User.find();
    return response.json(users);
  },

  async store(request, response) {
    const { name, email } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        stars: [false, false, false, false, false],
        active: true
      });
    }

    return response.json(user);
  }
};
