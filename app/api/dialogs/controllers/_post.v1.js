const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/command');
const slackDialog = require('./../models/SlackDialog');
const slackMethod = require('./../repository/slackMethods');
const Star = require('./../../../framework/Model/Star');

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
		return Promise.all([
			// STEP 1::get targeted user info
			slackMethod.getTargetedUser(AppConfigs.oAuthAccessToken, channel_id, channel_name, req),
			// STEP 2:: get count of used stars in this month
			Star.CountOfGivenStarsInThisMonth(req.body, req)
		])
			.then((result) => {
				if (result[1] < AppConfigs.maxNumberOfStarsPerMonth) {
					// build dialog variables
					const dialog = slackDialog.buildGiveAStarDialog(AppConfigs.oAuthAccessToken, trigger_id, result[0], result[1]);

					// open dialog on slack
					return slackMethod.openDialog(dialog, req)
						.then((result) => {
							res.send('');
						})
						.catch((err) =>
							res.sendStatus(500));
				} else {
					// send a slack bot message
					const message = this.getNoRemaingStarsMessage(req.body.user_id, req.body.channel_id, '');
					return slackMethod.sendSlackBotMessage(message, req)
						.then((result) => {
							res.send('');
						})
						.catch((err) =>
							res.sendStatus(500));
				}
			}).catch((err) =>
				res.sendStatus(500));
	}

	static getNoRemaingStarsMessage(userId, channel, text) {
		const messageBody = {
			token: AppConfigs.oAuthAccessToken,
			channel,
			text: `:wave: <@${userId}>,`,
			attachments: [
				{
					text: ' you done have more stars to give to your colegues..',
					callback_id: 'give-a-star-button',
					color: 'warning',
					attachment_type: 'default',
				}
			]
		};

		messageBody.attachments = JSON.stringify(messageBody.attachments);
		return messageBody;
	}
}

module.exports.controller = (req, res) => StarsDialog.execute(req, res);
module.exports.route = '/give-a-star-dialog';
