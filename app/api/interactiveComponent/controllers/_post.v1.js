const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/dialogSubmission');
const actions = require('./../repository/actions');
const slackDialog = require('./../../slashCommands/controllers/_post.v1.dialog' );
const Errors = require('./../../../framework/errors');

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
		body.user_id = body.user.id;
		body.team_id = body.team.id;
		body.channel_id = body.channel.id;
		// retur the response, no need to wait for submittion actions
		res.send('');
		if (body.callback_id === 'give-a-star') {
			return actions.giveStars(AppConfigs.tragetedChannel, body, req)
				.then((result) => {
					const text = `Thank you <@${req.body.user_id}> for using this app, Please find your stars report below:`;
					return actions.PostShortStarsReportMessage(text, { body, locale: req.locale, id: req.id })
						.then(result => {
							return;
						}).catch((err) => {
							return;
						});
				})
				.catch((err) => {
					const text = `We are so sorry <@${req.body.userId}>, We could not show you the dialog, please try later.`;
					actions.ShowErrorMessageToSlackUser(text, req);
					return;
				});
		// } else if (body.callback_id === 'give-a-star-button' && body.actions[0].value === 'give-a-star') {
			// open dialog on slack
			// return slackDialog.controller(req, res);
		} else if (body.callback_id === 'show-given-stars-report') {
			// post the given stars report
			actions.PostGivenStarsReportMessage({ body, locale: req.locale, id: req.id });
		} else if (body.callback_id === 'show-gain-stars-report') {
			// post the gain stars report
			actions.PostGainStarsReportMessage({ body, locale: req.locale, id: req.id });
		}
	}
}

module.exports.controller = (req, res) => InteractiveComponent.execute(req, res);
module.exports.route = '/interactive-component';
