class LoggerProvider {
  constructor() {
    this.m_loggerOptions = AppConfigs.loggerOptions;
    this.debug = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.debug(method, message, locale, requestId, meta);
      });
    };
    this.error = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.error(method, message, locale, requestId, meta);
      });
    };
    this.info = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.info(method, message, locale, requestId, meta);
      });
    };
    this.log = (level, method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.log(level, method, message, locale, requestId, meta);
      });
    };
    this.silly = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.silly(method, message, locale, requestId, meta);
      });
    };
    this.verbose = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.verbose(method, message, locale, requestId, meta);
      });
    };
    this.warn = (method, message, locale, requestId, meta) => {
      this.m_loggerProviders.forEach((logger) => {
        logger.warn(method, message, locale, requestId, meta);
      });
    };
    if (this.m_loggerOptions.loggerProviders) {
      this.m_loggerProviders = this.m_loggerOptions.loggerProviders.map((provider) => {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const providerInstance = require(provider.path);

        return (new providerInstance.Logger(provider.options));
      });
    }
    if (!this.m_loggerProviders || !this.m_loggerProviders.length) {
      this.m_loggerProviders = [];
    }
  }
}

module.exports.Logger = LoggerProvider;
