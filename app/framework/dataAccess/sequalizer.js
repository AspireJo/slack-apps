const Sequelize = require('sequelize');

const sequelizeInstance;
const Instance = () => {
  if (!sequelizeInstance) {
    sequelizeInstance = CreateInstance();
  }
  return sequelizeInstance;
}

const CreateInstance = () => {
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

const Sync = (tableName, TableInstance) => {
  tableInstance = Instance.define(tableName, TableInstance);
  tableInstance.sync();
}

const Add = (obj) => {
  tableInstance = Instance.define(tableName, TableInstance);
// you can also build, save and access the object with chaining:
tableInstance
  .build(obj)
  .save()
  .then(() => {
    // you can now access the currently saved task with the variable anotherTask... nice!
  })
  .catch(error => {
    // Ooops, do some error-handling
  })
}

module.exports = {Sync, Add};

