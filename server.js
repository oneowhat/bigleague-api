var express = require('express');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || "development";
var config = require('./config/config')[env];
var jwt = require('express-jwt');
var routes = require('./routes/routes');
var models = require("./models");

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.client);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,HEAD');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Max-Age', 600);
  next();
});

app.use('/api', jwt({ secret: config.secret })
  .unless({ path: [/^\/api\/guilds/] })
);

app.use(bodyParser.urlencoded({
  "extended": false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

routes.init(app);

models.sequelize.sync().then(function() {
  app.listen(process.env.PORT || 3000);
});
