const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/command');
const slackDialog = require('./../models/SlackDialog');
const slackMethod = require('./../repository/slackMethods');

class StarsDialog extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'StarsDialog';
	}

	static processRequest(req, res) {
		this.log(req, 'give-a-star dialog:: start');
		const { trigger_id, channel_name, channel_id } = req.body;

		return slackMethod.getTargetedUser(AppConfigs.oAuthAccessToken, channel_id, channel_name, req)
			.then((userId) => {
				// build dialog variables
				const dialog = slackDialog.buildGiveAStarDialog(AppConfigs.oAuthAccessToken, trigger_id, userId);

				// open dialog on slack
				return slackMethod.openDialog(dialog, req)
					.then((result) => {
						res.send('');
					})
					.catch((err) =>
						res.sendStatus(500));
			}).catch((err) =>
				res.sendStatus(500));
	}
}

module.exports.controller = (req, res) => StarsDialog.execute(req, res);
module.exports.route = '/give-a-star-dialog';
