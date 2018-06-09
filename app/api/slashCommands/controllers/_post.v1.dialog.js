const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/command');
const actions = require('./../repository/actions');

class StarsDialog extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'StarsDialog';
	}

	static processRequest(req, res) {
		Logger.info(req, 'give-a-star dialog:: start');
		return actions.getUserInfo(req)
			.then((result) => {
				if (result && result.length === 2 && Number.isNaN(result[1]) === false && result[1] < AppConfigs.maxNumberOfStarsPerMonth) {
					return actions.showDialogToSlackUser(result[0], result[1], req)
						.then((result) => {
							res.send('');
							return;
						})
						.catch((err) => {
							const text = `We are so sorry <@${req.body.user_id}>, We could not show you the dialog, please try later.`;
							actions.ShowErrorMessageToSlackUser(text, req);
							res.sendStatus(500);
							return;
						});
				} else {
					// send a slack  message to inform user that no remaining stars
					const text = `We are so sorry <@${req.body.user_id}>, you dont have enough stars remianing in this month, please find your stars report below:`;
					actions.PostShortStarsReportMessage(text, req);
					res.send('');
					return;
				}
			}).catch((err) => {
				const text = `We are so sorry <@${req.body.user_id}>, We could not show you the dialog, please try later.`;
				actions.ShowErrorMessageToSlackUser(text, req);
				res.sendStatus(500);
				return;
			});
	}
}

module.exports.controller = (req, res) => StarsDialog.execute(req, res);
module.exports.route = '/give-a-star-dialog';
