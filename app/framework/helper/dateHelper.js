const moment = require('moment');
const momentTimeZone = require('moment-timezone');

const minimumDate = new Date(1, 1, 1);

class DateHelper {
  static today(asUtc = true) {
    Logger.debug('helper::dateHelper', 'today', { asUtc });
    return asUtc ? moment().utc().startOf('day').toDate() : moment().startOf('day').toDate();
  }

  /**
     *
     * @param date
     * @param amount
     * @param unit years: y, quarters: Q, months: M, weeks: w, days: d, hours: h, minutes: m, seconds: s, milliseconds: ms
     * @returns {Date}
     */
  static add(date, amount, unit, locale = undefined) {
    Logger.debug('helper::dateHelper', 'add', locale, undefined, { date, amount, unit });
    if (!date) return undefined;
    if (!locale) return moment(date).add(amount, unit).toDate();
    return momentTimeZone.tz(date, AppConfigs.locales[locale].timeZone).add(amount, unit).toDate();
  }

  static diff(date1, date2, unit) {
    Logger.debug('helper::dateHelper', 'diff');
    return moment(date1).diff(date2, unit, false);
  }

  /**
   * Checks if sent date is valid date and is greater than 01/01/0001 then it return it as is, otherwise returns null
   * @param date: date value that is being validated
   */
  static validate(date) {
    if (!date || !moment(date).isValid()) { return null; }
    // Check if date is greater than minimum date
    if (date < minimumDate) { return null; }
    return date;
  }

  static parse(date) {
    return moment(date).toDate();
  }

  static toLocaleString(date) {
    return moment(date).format();
  }

  static parseDateOnly(date) {
    Logger.debug('helper::dateHelper', 'parseDateOnly');
    return moment(date).startOf('day').toDate();
  }

  static parseLocaleTimeZone(date, locale) {
    if (!date) return null;
    const { timeZone } = AppConfigs.locales[locale];
    return momentTimeZone.tz(date, timeZone).toDate();
  }

  static now(asUtc = true) {
    Logger.debug('helper::dateHelper', 'now', { asUtc });
    return asUtc ? moment().utc().toDate() : moment().toDate();
  }

  static format(date, format, locale = undefined, toUtc = true) {
    if (!date || date === null) return null;
    if (!locale) return moment(date).format(format);
    const dateVal = momentTimeZone.tz(date, AppConfigs.locales[locale].timeZone);
    if (toUtc) return dateVal.utc().format(format);
    return dateVal.format(format);
  }
}

module.exports = DateHelper;
