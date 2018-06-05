module.exports = {
  locales: {
    US: {
      dbConfig: {
        user: 's',
        password: 's',
        dataSource: 's',
        connectionLifetime: 600,
      },
    },
  },
  sequalizer: {
    host: 'localhost',
    database: 'aspire-slack',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
