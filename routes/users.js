var mongojs = require('mongojs');
var config = require('../../config/config');
var db = mongojs(config.db, ["users"]);
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
  
exports.register = function(req, res, next) {
  var newUser = req.body;
  db.users.findOne({email: newUser.email}, function(err, user) {
    if(!user){
      user = {
        name: newUser.name,
        email: newUser.email,
        salt: crypto.randomBytes(32).toString('hex'),
        createdAt: Date.now,
        confirmed: false
      };
      user.hashedPassword = encryptPassword(newUser.password, user.salt);
      db.users.insert(user, function(err, item) {
        if(err) return next(err);
        res.status(201).json({ success: true });
      });
    } else {
      res.json({ success: false, message: 'The email you provided  is already in use' });
    }
  });
};

exports.login = function(req, res, next) {
  var attempt = req.body;
  db.users.findOne({email: attempt.email}, function(err, user) {
    if(err) return next(err);
    if(user && checkPassword(user, attempt.password)){
      var token = jwt.sign({ username: attempt.email }, config.secret)
      res.status(200).json({ token: token, user: user });
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