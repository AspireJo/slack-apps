const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const helmet = require('helmet');
const router = require('express-promise-router');
const requestId = require('express-request-id')();
const glob = require('glob');
const path = require('path');
const middlewares = require('../../core/middlewares');
const customValidators = require('../../framework/validation/customValidators');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const routeGen = require('@aspirejo/express-route-generator');
const sequalizer = require('../dataAccess/sequalizer');
// const docGen = require('@aspirejo/swagger-generator-express');
// const docConfig = require('./../../../configuration/documentation');

/**
 * Initialize application middleware
 */
function initMiddleware(app) {
  Logger.info('app::initMiddleware', 'express app init middleware');
  // Showing stack errors
  app.set('showStackError', true);
  app.use(requestId);

  // Should be placed before express.static
  app.use(compress({
    filter: (req, res) => (/json/).test(res.getHeader('Content-Type')),
    level: 9,
  }));

  // Enable logger (morgan)
  // app.use(morgan(logger.getFormat(), logger.getOptions()));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(expressValidator());
  app.use(expressValidator(customValidators));

  // add morgan logger to log request : immedate is true.
  app.use(middlewares.morganLogger(true));
  // add morgan logger to log response
  app.use(middlewares.morganLogger());

  // swagger docs viewer
  //const docsFile = `${docConfig.output.location}/output.${docConfig.output.format}`
  // eslint-disable-next-line global-require, import/no-dynamic-require
  //if (fs.existsSync(docsFile)) app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require(docsFile), { explorer: true }));
  Logger.info('app::initMiddleware', 'end express app init middleware');
}

/**
 * Configure Helmet headers configuration
 */
function initHelmetHeaders(app) {
  Logger.info('app::initHelmetHeaders', 'express app init Helmet Headers');
  // Use helmet to secure Express headers
  app.use(helmet.noCache());
  app.use((req, res, next) => { // add custom private cache-control header
    const headerValue = res.getHeader('Cache-Control');
    res.setHeader('Cache-Control', `private, ${headerValue}`);
    next();
  });
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: 15778476000, // six months
    includeSubdomains: true,
    force: true,
  }));
  app.disable('x-powered-by');
  Logger.info('app::initHelmetHeaders', 'end express app init Helmet Headers');
}

/**
 * Configure error handling
 */
function initErrorRoutes(app) {
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      next();
      return;
    }
    // Log it
    Logger.error('initErrorRoutes', 'Error Occurred', 'US', req.id, err);

    // Redirect to error page
    const error = {
      error: {
        code: err.code,
        message: err.message,
        exception: err.response,
        id: req.id,
      },
    };
    if (err.explanation) error.explanation = err.explanation;
    res.status(err.status || Http.StatusCodes.INTERNAL_SERVER_ERROR_500).json(error);
  });
}

/**
 * Initialize the Express application
 */
module.exports.init = () => {
  Logger.info('app::init', 'express app init');

  // Initialize express app
  const app = express();

  // Initialize Helmet security headers
  initHelmetHeaders(app);

  // Initialize Express middleware
  initMiddleware(app);

  // generate routes
  const config = {
    pattern: `${path.resolve(__dirname, '../..')}/**/controllers/**/_*.js`,
  };
  routeGen.generate(app, config);

  // Initialize error routes
  initErrorRoutes(app);

  // initial DB  
  sequalizer.InitSequelize();

  return app;
};
