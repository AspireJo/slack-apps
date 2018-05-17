const Promise = require('bluebird');

/**
 * Base controller to all APIs
 * @class ControllerBase
 *
 *  How to use:
 *    Controller :
 *      - Require the base in your controller and extend it
 *      - MUST implement [processRequest(req,res)] to process
 *          the request and return the response.
 *          It is the controller responsiblity to return the response.
 *      - Override [schema] property to set the targeted schema
 *      - Implement [validate(req)] if the controller requires additional
 *          validations rather than schema based validations.
 *      - The controller should export the [execute] method to be used by the router
 *
 *    Router:
 *      - Point the router to your controller
 *
 *  How it works:
 *    - validate class abstract function
 *    - apply schema validation
 *    - apply business validation roles
 *    - apply process request
 */
class ControllerBase {
  // constructor
  /**
   * Creates an instance of ControllerBase.
   * @throws TypeError exception always to prevent instansiation
   * @memberof ControllerBase
   */
  constructor() {
    throw new TypeError('Cannot instantiate object from ControllerBase type');
  }

  /**
   * Validation schema type
   *
   * @readonly
   * @static
   *
   * @memberof ControllerBase
   */
  static get schema() { return undefined; }

  /**
   * Controller name
   *
   * @readonly
   * @static
   *
   * @memberof ControllerBase
   */
  static get name() { return undefined; }

  /**
   * Validate child controller implementation
   *
   * @static
   *
   * @memberof ControllerBase
   */
  static validateController() {
    if (this.processRequest === undefined || typeof this.processRequest !== 'function') {
      throw new TypeError('Must override processRequest method');
    }
    if (this.name === undefined) throw new TypeError('Must override controller name');
  }

  /**
   * validate schema roles
   *
   * @static
   * @param {any} req
   * @returns Promise for validation process
   *
   * @memberof ControllerBase
   */
  static validateSchema(req) {
    if (!this.schema) return Promise.resolve(true);
    return Validation.validate(req, this.schema);
  }

  /**
   * validate business roles
   *
   * @static
   * @returns Promise for validation process
   *
   * @memberof ControllerBase
   */
  static validate() { return true; }

  /**
   * Log message to logger
   *
   * @static
   * @param {any} req
   * @param {any} message
   * @param {any} [metadata={}]
   *
   * @memberof ControllerBase
   */
  static log(req, message, metadata = {}) {
    Logger.info(`controller::${this.name}`, message, req.locale, req.id, Object.assign({ memberNumber: req.memberNumber }, metadata));
  }

  /**
   * execute request
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns Promise for execute sequence result
   *
   * @memberof ControllerBase
   */
  static execute(req, res) {
    this.validateController();// make sure controller overrides processRequest
    this.log(req, 'started');
    return this.validateSchema(req)
      .then(() => this.validate(req))      
      .then(() => this.processRequest(req, res));
  }
}

module.exports = ControllerBase;
