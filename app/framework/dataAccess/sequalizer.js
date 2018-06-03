const Sequelize = require('sequelize');

const stars = require('../Model/stars');

let sequelize;
const createInstance = () => {
  return new Sequelize(AppConfigs.sequalizer.database, AppConfigs.sequalizer.username, AppConfigs.sequalizer.password, {
    host: AppConfigs.sequalizer.host,
    port: AppConfigs.sequalizer.port,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: AppConfigs.sequalizer.pool.max,
      min: AppConfigs.sequalizer.pool.min,
      acquire: AppConfigs.sequalizer.pool.acquire,
      idle: AppConfigs.sequalizer.pool.idle
    }

  });
}

const init = () => {
  if (!sequelize) {
    sequelize = createInstance();
  }
  const starsInstance = sequelize.define('stars', stars);
  sequelize.sync();
  starsInstance.create({
    type: '{ type: Sequelize.STRING, allowNull: false }',
    token: '{ type: Sequelize.STRING, allowNull: false }',
    action: '{ type: Sequelize.STRING, allowNull: false }',
    team_id: '{ type: Sequelize.STRING, allowNull: true }',
    team_domain: '{ type: Sequelize.STRING, allowNull: true }',
    action_user_id: '{ type: Sequelize.STRING, allowNull: false }',
    action_user_name: '{ type: Sequelize.STRING, allowNull: false }',
    channel_id: '{ type: Sequelize.STRING, allowNull: true }',
    channel_name: '{ type: Sequelize.STRING, allowNull: true }',
    receiver_id: '{ type: Sequelize.STRING, allowNull: false }',
    stars_count: 5,
    description: '{ type: Sequelize.STRING, allowNull: true }',
    show_me: false,
    callback_id: '{ type: Sequelize.STRING, allowNull: true }'
  })
}

const execute = () => { }

module.exports = { init, execute };
