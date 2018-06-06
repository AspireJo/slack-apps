const ControllerBase = require('./../../../framework/controller/controllerBase');
const dialog = require('./../../dialogs/controllers/_post.v1');
const schema = require('./../schema/dialogSubmission');
const actions = require('./../repository/actions');
const slackDialog = require('./../../dialogs/models/SlackDialog');
const slackMethod = require('./../../dialogs/repository/slackMethods');
const Errors = require('./../../../framework/errors');
const Star = require('./../../../framework/Model/Star');

class InteractiveComponent extends ControllerBase {
	static get schema() {
		return schema;
	}

	static validate(req) {
		const body = JSON.parse(req.body.payload);
		if (body.token !== AppConfigs.verificationToken) {
			throw new Errors.MISSING_TOKEN();
		}
		return true;
	}

	static get name() {
		return 'InteractiveComponent';
	}

	static processRequest(req, res) {
		this.log(req, 'dialog submission:: start');
		const body = JSON.parse(req.body.payload);

		// retur the response, no need to wait for submittion actions
		res.send('');
		if (body.callback_id === 'give-a-star') {
			return actions.giveStars(AppConfigs.tragetedChannel, body.user, body.submission, req)
				.then(() => {
					Star.Add(AppConfigs.tragetedChannel, body, req);
				})
				.catch((err) => res.sendStatus(500));
		} else if (body.callback_id === 'give-a-star-button' && body.actions[0].value === 'give-a-star') {
			// build dialog variables
			const dialog = slackDialog.buildGiveAStarDialog(AppConfigs.oAuthAccessToken, body.trigger_id, null);

			// open dialog on slack
			return slackMethod.openDialog(dialog, req)
				.then(() => { return null; })
				.catch((err) => res.sendStatus(500));
		}
	}
}

module.exports.controller = (req, res) => InteractiveComponent.execute(req, res);
module.exports.route = '/interactive-component';
