module.exports = {
  token: {
    in: 'body',
    errorMessage: 'missing token',
    matches: { options: [AppConfigs.verificationToken] }
  },
  trigger_id: {
    in: 'body',
    errorMessage: 'missing trigger_id'
  },
  channel_name: {
    in: 'body',
    errorMessage: 'missing channel_name'
  },
  channel_id: {
    in: 'body',
    errorMessage: 'missing channel_id'
  },
};
