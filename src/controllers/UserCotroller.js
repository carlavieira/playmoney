const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const mailer = require('../models/mailer');

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
  },

  async forgotPassword(request, response) {
    const { email } = request.body;
    
    try {
      const user = await User.findOne({ email });
  
      if(!user)
      return res.status(400).send({ error: 'User not found' });
  
      const token = crypto.randomBytes(10).toString('hex');
  
      const now = new Date();
      now.setHours(now.getHours()+1);
  
      await User.findByIdAndUpdate(user.id,{
        '$set':{
          passwordResetToken: token,
          passwordResetExpires:now,
        }
      });
  
      mailer.sendMail({
        to: email,

        //Carla Coloque seu email do MailTrap
        from: 'ronald.jcskate@gmail.com',
        template:'forgotpassword', 
        context: { token },
      }), (error) => {
        if(error)
        return response.status(400).send({ error: 'Cannot send forgot password email'});
  
        return response.send();
      }
  
    } catch (error) {
      response.status(400).send({ error: 'error on forgot password, try agan '});
    }
  },

  async reserPassword(request, response) {
    
    const { email, token, password } = require.body;

    try {
      const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

      if(!user)
      return response.status(400).send ({ error: 'User not found'});

      if(token !== user.passwordResetToken)
       return response.status(400).send({ error: 'token invalid'});

       const now = new Date();

       if (now > user.passwordResetExpires)
       return response.status(400).send({error: 'Token expired, generate a new one'});

       user.password = password;

       await user.save();

       response.send();

    } catch (error) {
      response.status(400).send({error: 'Cannot reset password, try again'});
      
    }
  } 
};


