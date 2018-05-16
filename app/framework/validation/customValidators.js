const moment = require('moment');
const exVal = require('express-validator');

module.exports = {
  customValidators: {
    isDate(value) {
      Logger.debug('customValidators', 'isDate', undefined, undefined, { value });
      const validateDateFormat = exVal.validator.isISO8601(value);
      if (!validateDateFormat) return false;
      const d = moment(value);
      if (d === null || !d.isValid()) return false;
      return true;
    },

    isAfterOrEqual(value, ...args) { // TODO : test cases other than today
      Logger.debug('customValidators', 'isAfterOrEqual', undefined, undefined, { value, args });
      const minValue = args.length > 1 && Object.keys(args).findIndex(key => key === 'min') > -1 && args.min !== undefined ? args.min : 'today';
      const comparison = minValue.toLowerCase() === 'today' ? Helper.date.today(false) // eslint-disable-line no-nested-ternary
        : Helper.date.validate(minValue) !== null ? Helper.date.parse(minValue) : undefined;
      const original = Helper.date.validate(value) !== null ? Helper.date.parse(value) : undefined;
      return !!(original && comparison && original >= comparison);
    },
  },
};
