const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/command');
const actions = require('./../repository/actions');

class ShowStarsReport extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'ShowStarsReport';
	}

	static processRequest(req, res) {
		Logger.info(req, 'show-stars-report:: start');

		const text = `Thank you <@${req.body.user_id}> for using this app, Please find your stars report below:`;
		actions.PostShortStarsReportMessage(text, req);
		res.send('');
		return;
	}
}

module.exports.controller = (req, res) => ShowStarsReport.execute(req, res);
module.exports.route = '/show-stars-report';
