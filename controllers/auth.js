const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req, res) => {
  console.log('hi');
  if (!req.body.username || !req.body.email || !req.body.password) {
      return res.json({ status: 400, message: 'Please enter a name, email, and password' });
  }
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    console.log(foundUser)
      if (err) return res.json({ status: 500, message: 'Something went wrong... Please try again!'});
      if (foundUser) return res.json({ status: 400, message: 'Something went wrong... Please try again!'});
      db.User.findOne({ email: req.body.email }, (err, foundUser) => {
          if (err) return res.json({ status: 500, message: 'Something went wrong... Please try again!'});
          if (foundUser) return res.json({ status: 400, message: 'Something went wrong... Please try again!'});
          bcrypt.genSalt(10, (err, salt) => {
              if (err) return res.json({ status: 500, message: 'Something went wrong. Please try again' });
      
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});
          
                  const newUser = {
                      username: req.body.username,
                      email: req.body.email,
                      password: hash,
                      location: req.body.location,
                  }
          
                  db.User.create(newUser, (err, savedUser) => {
                      if (err) return res.status(500).json({ status: 500, message: err});
                      req.session.currentUser = { id: savedUser._id };
                      return res.status(201).json({ status: 201, data: savedUser._id, message: 'Success' });
                  });
              });
          });
      });
  });
};

// POST login
const login = (req, res) => {
  console.log(req.body.username)
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ status: 400, message: 'Please enter your username and password'});
  }
  console.log('finding User')
  db.User.findOne({username: req.body.username}, (error, foundUser) => {
    if (error) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
    if (!foundUser) {
      return res.status(400).json({ status: 400, message: 'Username or Password is incorrect'});
    }
    console.log(foundUser)
    console.log('comparing password')
    console.log(req.body.password, foundUser.password)
    bcrypt.compare(req.body.password, foundUser.password, (error, isMatch) => {

      if (error) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});

      if (isMatch) {
        console.log('passwords match')
        req.session.currentUser = { id: foundUser._id };
        return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id });
      } else {
        return res.status(400).json({ status: 400, message: 'Username or Password is incorrect'});
      }
    });
  });
};


//POST logout

const logout = (req, res) => {
  if (!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });

  req.session.destroy((error) => {
    if (error) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});
    res.sendStatus(200);
  });
};

module.exports = {
  register,
  login,
  logout,
};