const errors = require('errors');
const statusCodes = require('../http/statusCodes');

errors.create({
  name: 'SQLFileNotNound',
  code: 1033,
  defaultMessage: 'sql file not found',
});
