var models = require('../models');
var Promise = models.sequelize.Promise;

const DUMMY = -1;

exports.create = function(req, res, next) {
  var campaignId = req.body.campaign;

	models.coach
		.findAll({ where: { campaignId: req.body.campaign }})
		.then(function(coaches) {
      var rounds = generateSchedule(campaignId, coaches);
      Promise.all(rounds).then(function() {
        res.status(201).json({ success: true });
      });
      /*
      rounds.forEach(function(round) {
        insertRound(round, next);
      });
      */
    });
}

function insertRound(round, next) {
  return models.round
    .build(round)
    .save()
    .then(function(newRound) {
      if(newRound) {
        var matches = [];
        round.matches.forEach(function(match) {
          matches.push(insertMatch(newRound, match));
        });
        return Promise.all(matches).then(function() {
          return true;
        });
      }
    });
}

function insertMatch(round, match) {
  match.roundId = round.id;
  return models.match
    .build(match)
    .save()
    .then(function (newMatch) {
      return true;
    });
}

function generateSchedule(campaignId, coaches) {
  var rounds = [];
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
    var round = {
      campaignId: campaignId,
      roundNumber: j,
      matches: []
    };
    for (var i = 0; i < n / 2; i += 1) {
      if (pairs[i] !== DUMMY && pairs[n - 1 - i] !== DUMMY) {
        if(j % 2 === 0) {
          round.matches.push(newMatch(pairs[i], pairs[n - 1 - i], campaignId));
        } else {
          round.matches.push(newMatch(pairs[n - 1 - i], pairs[i], campaignId));
        }
      }
    }
    rounds.push(insertRound(round));
    pairs.splice(1, 0, pairs.pop()); // permutate for next round
  }

  return rounds;
}

function newMatch(coachOne, coachTwo, campaignId) {
  return {
    campaignId: campaignId,
    homeCoachId: coachOne,
    awayCoachId: coachTwo,
    homeScore: 0,
    awayScore: 0,
    roundId: 0
  };
}
