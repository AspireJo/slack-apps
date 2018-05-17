module.exports = {
  payload: {
    in: 'body',
    errorMessage: 'missing payload',
    token: {
      in: 'body',
      errorMessage: 'missing token',
      matches: { options: [AppConfigs.verificationToken] }
    }
  }
};
