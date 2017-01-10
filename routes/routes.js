var guilds = require('./guilds');
var users = require('./users');
var campaigns = require('./campaigns');
var coaches = require('./coaches');
var schedule = require('./schedule');
var matches = require('./matches');
var finalizer = require('./finalizer');

exports.init = function(app) {

  // guilds
  app.get('/api/guilds', guilds.all);
  app.get('/api/guild/:id', guilds.byId);

  // campaigns
  app.get('/api/campaigns/:userId', campaigns.byUser);
  app.get('/api/campaign/:title', campaigns.byTitle);
  app.put('/api/campaigns', campaigns.update);
  app.post('/api/campaigns', campaigns.insert);
  app.post('/api/campaign/finalize', finalizer.do);

  // players
  app.get('/api/coaches/:campaign', coaches.forCampaign);
  app.get('/api/coach/:id', coaches.byId);
  app.post('/api/coaches', coaches.insert);
  app.put('/api/coaches', coaches.update);

  // schedule creator
  app.post('/api/schedule', schedule.create);

  // matches
  app.put('/api/matches', matches.update);

  // users
  app.post('/register', users.register);
  app.post('/login', users.login);

};
