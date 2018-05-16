module.exports.validate = (req, schema) => {
  Logger.info('validation::validate', 'validating request', req.locale, req.id);
  Logger.debug('validation::validate', 'validating request', req.locale, req.id, {
    req: {
      reqParams: req.params,
      reqBody: req.body,
      reqQuery: req.query,
    },
    schema,
  });
  req.check(schema);
  return req.getValidationResult()
    .then((validationResults) => {
      if (validationResults.isEmpty()) {
        Logger.info('validation::validate', 'valid request', req.locale, req.id);
        return validationResults;
      }

      Logger.error(
        'validation::validate', 'invalid request', req.locale, req.id,
        { req: { params: req.params, body: req.body, }, schema, validationErrors: validationResults.array() }
      );
      throw new Errors.InvalidRequestError({ explanation: validationResults.array() });
    });
};
