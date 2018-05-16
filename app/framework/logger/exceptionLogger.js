const winston = require('winston');

class ExceptionProvider {
  constructor(options) {
    this.m_logger = new winston.Logger({
      level: options.default.level,
      exitOnError: options.default.exitOnError,
      exceptionHandlers: [
        new winston.transports.File(options.exception),
      ],
    });

    options.transports.forEach((transport) => {
      this.m_logger.add(winston.transports[transport.type], transport.transport);
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

      if (requestId && typeof requestId === 'object' && !meta) {
        metaLog = requestId;
      } else {
        metaLog = meta || {};
        metaLog.requestId = requestId;
      }

      metaLog.method = method;
      metaLog.environment = AppConfigs.environment;
      metaLog.locale = locale;
      metaLog.siteId = config.siteId;
      this.m_logger.log(level, message, metaLog);
    };
    this.silly = (method, message, locale, requestId, meta) => {
      this.log('silly', method, message, locale, requestId, meta);
    };
    this.verbose = (method, message, locale, requestId, meta) => {
      this.log('verbose', method, message, locale, requestId, meta);
    };
    this.warn = (method, message, locale, requestId, meta) => {
      this.log('warn', method, message, locale, requestId, meta);
    };
  }
}

module.exports.Logger = ExceptionProvider;
