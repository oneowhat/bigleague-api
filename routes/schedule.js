var models = require('../models');

const DUMMY = -1;

exports.create = function(req, res, next) {
  var campaignId = req.body.campaign;

	models.coach
		.findAll({ where: { campaignId: req.body.campaign }})
		.then(function(coaches) {
      var matches = generateSchedule(campaignId, coaches);
      matches.forEach(function(match) {
        var result = insertMatch(match, next);
      });
      res.status(201).json({ success: true });
    });
}

function insertMatch(match, next) {
  models.match
    .build(match)
    .save()
    .then(function(newMatch) {
      return newMatch;
    })
    .catch(function(err) {
      return err;
    });
}

function generateSchedule(campaignId, coaches) {
  var matches = [];
  var n = coaches.length;
  var pairs = [];

  coaches.forEach(function(coach) {
    pairs.push(coach.id);
  });

  if (n % 2 === 1) {
    pairs.push(DUMMY); // factor in the 'bye'
    n += 1;
  }
  for (var j = 0; j < n - 1; j += 1) {
    for (var i = 0; i < n / 2; i += 1) {
      if (pairs[i] !== DUMMY && pairs[n - 1 - i] !== DUMMY) {
        matches.push(newMatch(pairs[i], pairs[n - 1 - i], j), campaignId);
      }
    }
    pairs.splice(1, 0, pairs.pop()); // permutate for next round
  }

  return rounds;
}

function newMatch(coachOne, coachTwo, round, campaignId) {
  return {
    homeCoachId: coachOne,
    awayCoachId: coachTwo,
    homeScore: 0,
    awayScore: 0,
    round: round
  };
}
