const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/command');
const dialog = require('./../models/give-a-star-dialog');
const slackMethod = require('./../repository/slackMethods');

class ClientInfoController extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'give-a-star-dialog';
	}

	static processRequest(req, res) {
		this.log(req, 'give-a-star dialog:: start');
		const { token, trigger_id, channel_name, channel_id } = req.body;
		const dialogSample = JSON.parse(JSON.stringify(dialog));

		return slackMethod.getTargetedUser(AppConfigs.oAuthAccessToken, channel_id, channel_name, req)
			.then((userId) => {
				//set dialog variables
				dialogSample.trigger_id = trigger_id;
				dialogSample.dialog.elements[0].value = userId;

				// open dialog on slack
				return slackMethod.openDialog(dialogSample, req)
					.then((result) => {
						res.send('');
					})
					.catch((err) => res.sendStatus(500));
			}).catch((err) => res.sendStatus(500));
	}
}

module.exports.controller = (req, res) => ClientInfoController.execute(req, res);
module.exports.route = '/give-a-star-dialog';
