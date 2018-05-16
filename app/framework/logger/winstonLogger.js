const winston = require('winston');

class WinstonProvider {
  constructor(options) {
    this.m_logger = new winston.Logger({
      level: options.default.level,
      exitOnError: options.default.exitOnError,
    });

    options.transports.forEach((t) => {
      this.m_logger.add(winston.transports[t.type], t.transport);
    });

    this.debug = (method, message, locale, requestId, meta) => {
      this.log('debug', method, message, locale, requestId, meta);
    };
    this.error = (method, message, locale, requestId, meta) => {
      this.log('error', method, message, locale, requestId, meta);
    };
    this.info = (method, message, locale, requestId, meta) => {
      this.log('info', method, message, locale, requestId, meta);
    };
    this.log = (level, method, message, locale, requestId, meta) => {
      let metaLog;
      const config = AppConfigs.locales[locale] || {};

      if (typeof requestId === 'object') {
        metaLog = requestId;
      } else {
        metaLog = meta || {};
      }

      metaLog.method = method;
      metaLog.requestId = requestId;
      metaLog.environment = AppConfigs.environment;
      metaLog.locale = locale;
      metaLog.siteId = config.siteId;

      this.m_logger.log(level, message, metaLog);
    };
    this.silly = (method, message, locale, meta) => {
      this.log('silly', method, message, locale, meta);
    };
    this.verbose = (method, message, locale, requestId, meta) => {
      this.log('verbose', method, message, locale, requestId, meta);
    };
    this.warn = (method, message, locale, requestId, meta) => {
      this.log('warn', method, message, locale, requestId, meta);
    };
  }
}

module.exports.Logger = WinstonProvider;
