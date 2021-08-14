const Sequelize = require('sequelize');
const db = require('../db');

const Drink = db.define('drink', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alcoholic: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  imgUrl: {
    type: Sequelize.STRING,
  },
  glass: {
    type: Sequelize.STRING,
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  measurements: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  instructions: {
    type: Sequelize.TEXT,
  },
});

module.exports = Drink;
