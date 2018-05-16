const _ = require('lodash');
const middlewares = require('./middlewares');
const settings = require('./settings');

/*
  versioning settings
*/
module.exports.config = _.merge({}, settings.config, middlewares.config);

/*
  indicates the global middlewares that will be applied on all versions and routes
*/
module.exports.globalMiddlewares = middlewares.globalMiddlewares;
