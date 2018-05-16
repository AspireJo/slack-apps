const dbMethod = require('./dbMethods');
const slackMethod = require('./slackMethods');
const messageBody = require('./../models/messageBody');

/*  giveStars
*    call a get api from slack to get the conversations info and then extract the targeted user
*   Param targeted channel
*   Param user, the sender
*   Param args, submitted dialog's data
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.giveStars = (channel, user, args, { locale, id }) => {
	const method = 'interactiveComponent::dialogsActions::giveStars';
	Logger.info(method, 'save given stars in DB', channel, user, args);
	// TODO:: When we continue this project will save these info in DB for tracking and limitations

	Logger.info(method, 'notify members about a new star(s)', channel, user, args);
	messageBody.channel = channel;
	messageBody.text = buildMessage(user, args);
	return slackMethod.postMessage(messageBody, { locale, id });
};

/*  buildMessage
*    Customize and format the stars' message based on the inputs from the dialog
*   Param user, the sender
*   Param args, submitted dialog's data
*   Output: formatted message.
*/
const buildMessage = (user, args) => {
	// introduce the message
	let msg = `Hey <@${args.receiver}> you got`;

	// Show  how many stars the sender granted
	for (var i = 0; i < parseInt(args.noOfStars, 10); i++) {
		msg = msg + ' :star2:';
	}

	// Show sender if he/she allowed this from dialog
	if (args.showMe === 'Y') {
		msg = msg + ` from <@${user.id}>`;
	}

	// Show the reason in a new line if sender provided that
	if (args.description) {
		msg = msg + `\nReason: ${args.description}`;
	}

	// Return the result message
	return msg;
};