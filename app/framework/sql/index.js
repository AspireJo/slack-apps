const fs = require('fs');
const path = require('path');

class Sql {
  constructor(modulePath) {
    this.modulePath = modulePath;

    this.get = (key, locale, requestId) => {
      const cachedQueries = Cache.SQL_QUERIES || {};
      Logger.info('sql::get', `module:${this.modulePath}`, locale, requestId);
      const filePath = path.resolve(path.resolve(__dirname, '../../..', this.modulePath, `${key}.sql`));
      Logger.info('Sql', 'get sql file content', locale, requestId, { filePath });

      if (filePath in cachedQueries) return cachedQueries[filePath];

      if (fs.existsSync(filePath)) {
        Logger.info('Sql', 'start reading sql file', locale, requestId, { filePath });
        cachedQueries[filePath] = fs.readFileSync(filePath).toString();
        Cache.SQL_QUERIES = cachedQueries;
        Logger.info('Sql', 'sql file cached', locale, requestId, { filePath });
        return cachedQueries[filePath];
      }
      Logger.error('sql::get', 'sql file not found', locale, requestId, { filePath });
      throw new Errors.SQLFileNotNound({ explanation: `sql file not found, path: ${filePath}` });
    };
  }
}

module.exports = Sql;
