'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('player', [
      { name: "Alchemist's", active: true },
      { name: "Brewer's", active: true },
      { name: "Butcher's", active: true },
      { name: "Engineer's", active: true },
      { name: "Farmer's", active: false },
      { name: "Fisherman's", active: true },
      { name: "Hunter's", active: true },
      { name: "Mason's", active: true },
      { name: "Mortician's", active: true },
      { name: "The Union", active: true }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('player', null, {});
  }
};
