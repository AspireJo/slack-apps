const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const configFolder = path.resolve(__dirname, './env');

/**
 * Validate NODE_ENV existence
 */
const validateEnvironmentVariable = () => {
  if (!process.env.NODE_ENV) {
    // eslint-disable-next-line no-console
    console.warn('configuration::validateEnvironmentVariable', '+ Warn: NODE_ENV is not defined! Using default development environment');
    process.env.NODE_ENV = 'development';
  }
};

/**
 * Initialize global configuration
 */
const initGlobalConfig = () => {
  validateEnvironmentVariable();

  const environment = process.env.NODE_ENV;
  const configFiles = [
    path.join(configFolder, 'default.js'),
    path.join(configFolder, `${environment}.default.js`),
    path.join(configFolder, `${environment}.secret.js`),
  ];

  const configs = configFiles.map((configFilePath) => {
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`environment file not found for ${environment}, ${configFilePath}, ${__dirname}`);
    }

    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(configFilePath);
  });

  const mergedConfigs = _.merge({}, ...configs);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(path.resolve(configFolder, '../../package.json'));
  mergedConfigs.app = {
    name: pkg.name,
    version: pkg.version,
  };

  mergedConfigs.environment = environment;

  // eslint-disable-next-line no-console
  console.log(mergedConfigs);

  return mergedConfigs;
};

module.exports = initGlobalConfig();
