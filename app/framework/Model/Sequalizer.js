const Sequelize = require('sequelize');

class Sequalizer {

  static CreateAlterTable = (tableName, TableInstance) => {
    Sequelize.Sync(tableName, TableInstance);
  }

  static Add(obj) {
    Sequelize.Add(obj);
  }
}

module.exports = Sequalizer;
