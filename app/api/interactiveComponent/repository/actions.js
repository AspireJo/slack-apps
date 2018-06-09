const dbMethod = require('./dbMethods');
const slackMethod = require('./slackMethods');
const messageBody = require('./../models/messageBody');
const messageAttachment = require('./../models/messageAttachment');
const attachmentAction = require('./../models/attachmentAction');

/*  giveStars
*    call a get api from slack to get the conversations info and then extract the targeted user
*   Param targeted channel
*   Param user, the sender
*   Param args, submitted dialog's data
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.giveStars = (channel, body, { locale, id }) => {
	const method = 'interactiveComponent::actions::giveStars';
	Logger.info(method, 'save given stars in DB', channel, body);
	// Save request in DB
	return dbMethod.saveGivenStars(channel, { body, locale, id })
		.then(result => {
			// Post Stars to the channel
			Logger.info(method, 'notify members about a new star(s)', channel, body);
			const message = messageBody.Instance(AppConfigs.oAuthAccessToken, channel, undefined, buildGiveStarsMessage(body));
			return slackMethod.postMessage(message, { locale, id });
		})
};

/*  PostShortStarsReportMessage
*    post on slack by slack bot to show the stars report for this month
*   Param initMessage
*   Param body, the the request
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.PostShortStarsReportMessage = (initialText, { body, locale, id }) => {
	let text = initialText;
	const method = 'interactiveComponent::actions::PostStarsReportMessage::Stars';
	Logger.info(method, 'get given stars from DB', { body, locale, id });
	// get count of given stars by provided user in this month
	return Promise.all([
		dbMethod.CountOfGivenStarsInThisMonth({ body, locale, id }),
		dbMethod.CountOfGainStarsInThisMonth({ body, locale, id })
	])
		.then((result) => {
			let action;
			let attachment;
			let message = '';
			let actions = [];
			let attachments = [];

			// Prepare Given Stars Section
			actions = [];
			if (result[0] === 0) {
				attachment = messageAttachment.Instance(`You did not give any stars this month.`, '', 'Something went wrong!', '#ba2f0d', 'default', actions);
				attachments.push(attachment);
			} else if (result[0] === 1) {
				action = attachmentAction.Instance("given-stars-report", "Show Given Star Report", "button", "given-stars-report", "primary");
				actions.push(action);
				attachment = messageAttachment.Instance(`You gave only one star this month.`, 'show-given-stars-report', 'Something went wrong!', '#0d98ba', 'default', actions);
				attachments.push(attachment);
			} else if (result[0] > 1) {
				let color = '#0d98ba';
				action = attachmentAction.Instance("given-stars-report", "Show Given Stars Report", "button", "given-stars-report", "primary");
				actions.push(action);
				if (result[0] >= AppConfigs.maxNumberOfStarsPerMonth) {
					color = '#0dba2f';
				}
				attachment = messageAttachment.Instance(`You gave ${result[0]} stars this month.`, 'show-given-stars-report', 'Something went wrong!', color, 'default', actions);
				attachments.push(attachment);
			}

			// Prepare Gain Stars Section
			actions = [];
			if (result[1] === 0) {
				attachment = messageAttachment.Instance(`You did not gain any stars this month.`, '', 'Something went wrong!', '#ba2f0d', 'default', actions);
				attachments.push(attachment);
			} else if (result[1] === 1) {
				action = attachmentAction.Instance("gain-stars-report", "Show Gain Stars Report", "button", "gain-stars-report", "primary");
				actions.push(action);
				attachment = messageAttachment.Instance(`You gain only one star this month.`, 'show-gain-stars-report', 'Something went wrong!', '#0dba2f', 'default', actions);
				attachments.push(attachment);
			} else if (result[1] > 1) {
				action = attachmentAction.Instance("gain-stars-report", "Show Gain Stars Report", "button", "gain-stars-report", "primary");
				actions.push(action);
				attachment = messageAttachment.Instance(`You gain ${result[1]} stars this month.`, 'show-gain-stars-report', 'Something went wrong!', '#0dba2f', 'default', actions);
				attachments.push(attachment);
			}

			// Prepare Message Body
			message = messageBody.Instance(AppConfigs.botToken, AppConfigs.tragetedChannel, body.user_id, initialText, attachments);

			// Send the message
			return slackMethod.postEphemeralMessage(message, { locale, id });

		}).catch((err) => {
			text = `We are so sorry <@${body.user_id}>, We could not retrive the stars that you gave this month, please try later.`;
			ShowErrorMessageToSlackUser(text, { body, locale, id });
			return;
		});
};

/*  PostGivenStarsReportMessage
*   post on slack by slack bot to show the stars report for this month
*   Param body, the the request
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.PostGivenStarsReportMessage = ({ body, locale, id }) => {

	const method = 'interactiveComponent::actions::PostGivenStarsReportMessage::Stars';
	Logger.info(method, 'get given stars from DB', { body, locale, id });
	// get count of given stars by provided user in this month
	return dbMethod.getGivenStarsInThisMonthByUser({ body, locale, id })
		.then((result) => {
			let attachment;
			let message = '';
			let attachments = [];
			let text;
			const mainText = 'Here is a list of stars that you gave this month:'

			result.forEach(element => {
				text = '';
				for (let i = 0; i < element.stars_count; i++) {
					text += AppConfigs.starIcon;
				}
				text += ` to <@${element.receiver_id}>`;
				text += ` on ${element.createdAt.toLocaleString()}`;
				if (element.description) {
					text += `, Reason: _${element.description.trim()}_`;
				}
				attachment = messageAttachment.Instance(text, '', 'Something went wrong!', '#0d98ba', 'default');
				attachments.push(attachment);
			});

			message = messageBody.Instance(AppConfigs.botToken, AppConfigs.tragetedChannel, body.user_id, mainText, attachments);
			return slackMethod.postEphemeralMessage(message, { locale, id });

		}).catch((err) => {
			text = `We are so sorry <@${body.user_id}>, We could not retrive the stars that you gave this month, please try later.`;
			ShowErrorMessageToSlackUser(text, { body, locale, id });
			return;
		});
};

/*	PostGainStarsReportMessage
*   post on slack by slack bot to show the stars report for this month
*   Param body, the the request
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.PostGainStarsReportMessage = ({ body, locale, id }) => {

	const method = 'interactiveComponent::actions::PostGainStarsReportMessage::Stars';
	Logger.info(method, 'get gain stars from DB', { body, locale, id });
	// get count of given stars by provided user in this month
	return dbMethod.getGainStarsInThisMonthByUser({ body, locale, id })
		.then((result) => {
			let attachment;
			let message = '';
			let attachments = [];
			let text;
			const mainText = 'Here is a list of stars that you gain this month:'

			result.forEach(element => {
				text = '';

				// Draw Stars
				for (let i = 0; i < element.stars_count; i++) {
					text += AppConfigs.starIcon;
				}

				// From <Optional>
				if (element.action_user_id) {
					text += ` from <@${element.action_user_id}>`;
				}

				// Date
				text += ` on ${element.createdAt.toLocaleString()}`;

				// Reason <Optional>
				if (element.description) {
					text += `, Reason: _${element.description.trim()}_`;
				}
				attachment = messageAttachment.Instance(text, '', 'Something went wrong!', '#0d98ba', 'default');
				attachments.push(attachment);
			});

			message = messageBody.Instance(AppConfigs.botToken, AppConfigs.tragetedChannel, body.user_id, mainText, attachments);
			return slackMethod.postEphemeralMessage(message, { locale, id });

		}).catch((err) => {
			text = `We are so sorry <@${body.user_id}>, We could not retrive the stars that you gave this month, please try later.`;
			ShowErrorMessageToSlackUser(text, { body, locale, id });
			return;
		});
};

const ShowErrorMessageToSlackUser = (text, { body, locale, id }) => {
	try {
		const message = messageBody.Instance(AppConfigs.botToken, AppConfigs.tragetedChannel, body.user_id, text);
		return slackMethod.postEphemeralMessage(message, { locale, id });
	} catch (err) {
		Logger.error(err);
		return;
	}
};

module.exports.ShowErrorMessageToSlackUser = ShowErrorMessageToSlackUser;
/*  buildGiveStarsMessage
*    Customize and format the stars' message based on the inputs from the dialog
*   Param user, the sender
*   Param args, submitted dialog's data
*   Output: formatted message.
*/
const buildGiveStarsMessage = (body) => {
	// introduce the message
	let msg = `Hey <@${body.submission.receiver}> you got`;

	// Show  how many stars the sender granted
	for (var i = 0; i < parseInt(body.submission.noOfStars, 10); i++) {
		msg = msg + ` ${AppConfigs.starIcon}`;
	}

	// Show sender if he/she allowed this from dialog
	if (body.submission.showMe === 'Y') {
		msg = msg + ` from <@${body.user.id}>`;
	}

	// Show the reason in a new line if sender provided that
	if (body.submission.description) {
		msg = msg + `\nReason: ${body.submission.description}`;
	}

	// Return the result message
	return msg;
};
