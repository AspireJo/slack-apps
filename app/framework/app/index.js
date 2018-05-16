const configuration = require('../../../configuration');
const errors = require('../errors');
const express = require('./express');
const httpStatusCodes = require('../http/statusCodes');
const logger = require('../logger');
const validation = require('../validation');
const helper = require('../helper');

function initEnvironmentVariables() {
  /* http */
  global.Http = { StatusCodes: httpStatusCodes };

  /* Errors */
  global.Errors = errors;

  /* Validation */
  global.Validation = validation;

  /* App Configs */
  global.AppConfigs = configuration;

  /* Logger */
  global.Logger = new logger.Logger();
  global.Helper = helper;

  global.Cache = {};
  // eslint-disable-next-line global-require, import/no-dynamic-require
  global.Promise = require('bluebird');
}

module.exports.init = function init(callback) {
  initEnvironmentVariables();
  const app = express.init();
  if (callback) callback(app, configuration);
};

module.exports.start = function start() {
  this.init((app, config) => {
    Logger.info('app::init', 'starting node app', 'null', 'null', null);

    // Start the app by listening on <port>
    app.listen(config.port, (error) => {
      Logger.info('app::init', 'node app started', 'null', 'null', null);
      /* eslint-disable no-console */
      // Logging initialization
      console.log('app::listen', '--');
      console.log('app::listen', `App name:\t\t\t\t${config.app.name}`);
      console.log('app::listen', `App version:\t\t\t${config.app.version}`);
      console.log('app::listen', `Environment:\t\t\t${config.environment}`);
      console.log('app::listen', `Port:\t\t\t\t${config.port}`);
      if (error) {
        console.error('app::listen', `+ Error: server did not start, error: ${error}`);
        process.exit(1);
      } else {
        console.log('app::listen', `server started on port: ${config.port}`);
      }
      console.log('app::listen', '--');
      /* eslint-enable no-console */
    });
  });
};
