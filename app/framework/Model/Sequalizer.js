const Sequelize = require('sequelize');

class Sequalizer {
  static getInstance() {
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



  static define(tableName, TableInstance) {
    return this.getInstance().define(tableName, TableInstance, { freezeTableName: true });
  }

  static sync(tableInstance) {
    tableInstance.sync();
  }
}

module.exports = Sequalizer;
