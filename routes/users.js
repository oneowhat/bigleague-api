var models = require('../models');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || "development";
var config = require('../config/config')[env];

exports.register = function(req, res, next) {

  var newUser = req.body;

  models.user
    .findOne({ where: { email: newUser.email } })
    .then(function(user) {
      if(!user) {
        user = {
          name: newUser.name,
          email: newUser.email,
          salt: crypto.randomBytes(32).toString('hex'),
          confirmed: false
        };
        user.hashedPassword = encryptPassword(newUser.password, user.salt);
        models.user
          .build(user)
          .save()
          .then(function(user) {
            res.status(201).json({ success: true });
          });
      } else {
        res.json({ success: false, message: 'The email you provided  is already in use' });
      }
    });
};

exports.login = function(req, res, next) {

  var attempt = req.body;

  models.user
    .findOne({ where: { email: attempt.email } })
    .then(function(user){
      if(user && checkPassword(user, attempt.password)) {
        var token = jwt.sign({ username: attempt.email }, config.secret);
        res.status(200).json({
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin
          }
        });
      } else {
        res.status(401).send('Invalid username/password');
      }
    });
};

function encryptPassword(password, salt) {
  return crypto
    .createHmac('sha256', salt)
    .update(password)
    .digest('hex');
}

function checkPassword(user, password) {
  return encryptPassword(password, user.salt) === user.hashedPassword;
}
