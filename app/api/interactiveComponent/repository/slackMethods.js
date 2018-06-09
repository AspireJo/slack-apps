const axios = require('axios');
const qs = require('querystring');

/*  postMessage
*   Call a post message api from slack to add a message to a specific channel
*   Param messageBody the message body {token, channel and text}
*   Output: promise of of calling slack api
*/
module.exports.postMessage = (messageBody, { locale, id }) => {
	try {
		const method = 'interactiveComponent::slackMethods::postMessage';
		Logger.info(method, 'send message to slack', locale, id);
		return axios.post('https://slack.com/api/chat.postMessage', qs.stringify(messageBody));
	} catch (err) {
		Logger.error(err);
		return;
	}
};


/*  postEphemeral
*   Call a post message api from slack to add a message to a specific channel
*   Param messageBody the message body {token, channel and text}
*   Output: promise of of calling slack api
*/
module.exports.postEphemeralMessage = (messageBody, { locale, id }) => {
	try {
		const method = 'interactiveComponent::slackMethods::postEphemeralMessage';
		Logger.info(method, 'send message to slack', locale, id);
		return axios.post('https://slack.com/api/chat.postEphemeral', qs.stringify(messageBody))
			.then(result => {
				Logger.info(result);
			});
	} catch (err) {
		Logger.error(err);
		return;
	}
};

