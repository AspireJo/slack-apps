const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const BASE_LOGS_DIRECTORY = process.env.LOG_FOLDER || './../data/logs';
const LOGS_DIRECTORY = path.join(BASE_LOGS_DIRECTORY, process.env.NODE_APP || 'slack-apps');

console.log('LOGS_DIRECTORY:', LOGS_DIRECTORY);

if (!fs.existsSync(LOGS_DIRECTORY)) mkdirp.sync(LOGS_DIRECTORY);

module.exports = {
  port: process.env.PORT || 3000,
  locales: {
    JO: {
      siteId: 1,
      countryAbbrName: 'JO',
      countryId: 1000,
      currencyCode: 'JOD',
      market: 'en-JO',
      timeZone: 'Jordan/Amman',
    },
  },
  loggerOptions: {
    logFolderPath: LOGS_DIRECTORY,
    loggerProviders: [
      {
        path: './winstonLogger',
        options: {
          default: {
            level: 'verbose',
            exitOnError: false,
          },
          transports: [
            {
              type: 'Console',
              transport: {
                name: 'console',
                level: 'silly',
                colorize: true,
              },
            },
            {
              type: 'File',
              transport: {
                name: 'file-log',
                level: 'debug',
                filename: path.join(LOGS_DIRECTORY, 'logs.json'),
                maxsize: 1024 * 1024 * 5,
              },
            },
          ],
        },
      },
      {
        path: './exceptionLogger',
        options: {
          default: {
            level: 'verbose',
            exitOnError: false,
          },
          exception: {
            name: 'exception',
            level: 'verbose',
            filename: path.join(LOGS_DIRECTORY, 'exception.json'),
            maxsize: 1024 * 1024 * 5,
          },
          transports: [],
        },
      },
    ],
  },
};
