class NumberHelper {
  static toFixed(number, fractionalDigits) {
    Logger.debug('helper::NumberHelper', 'toFixed', undefined, undefined, { number, fractionalDigits });
    if (number || number === 0) {
      return Number(parseFloat(number).toFixed(fractionalDigits || 2));
    }
    return undefined;
  }

  static parseInteger(number) {
    Logger.debug('helper::NumberHelper', 'parseInteger', undefined, undefined, { number });
    if (!number) return undefined;
    return parseInt(number, 10);
  }
}
module.exports = NumberHelper;
