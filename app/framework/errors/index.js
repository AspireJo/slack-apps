const errors = require('errors');
const statusCodes = require('../http/statusCodes');

errors.create({
  name: 'MISSING_TOKEN',
  code: 1031,
  defaultMessage: 'Missing Token',
});

errors.create({
  name: 'MISSING_CHALLENGE',
  code: 1032,
  defaultMessage: 'Missing Challenge value',
});

errors.create({
  name: 'SQLFileNotNound',
  code: 1033,
  defaultMessage: 'sql file not found',
});
