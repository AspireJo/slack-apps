module.exports.controller = (req, res) => {
  Logger.info('controller::Healthycheck', 'start healthycheck', 'US', req.id);
  return res.send('api is live').end();
};

module.exports.route = '/healthcheck';
