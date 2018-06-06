const Sequelize = require('sequelize');
const Star = require('./../Model/Star');

const InitSequelize = () => {
  Star.Init();
}

module.exports = { InitSequelize };

