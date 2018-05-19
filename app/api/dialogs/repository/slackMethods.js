const axios = require('axios');
const qs = require('querystring');

/*  openDialog
*   Call a post api from slack to open a dialog for user
*   Param dialog(json) to be sent to slack
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api
*/
module.exports.openDialog = (dialog, { locale, id }) => {
	const method = 'dialogs::slackMethods::openDialog';
	Logger.info(method, 'open dialog on slack', locale, id);
	return axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog));
};

/*  getTargetedUser
*    call a get api from slack to get the conversations info and then extract the targeted user
*   Param token to be able to call slack
*   Param channel_id to get the username based on this directmessage channel
*   Param channel_name to make sure it is a directmessage before call the service
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api with the username, if it is not a directmessage the function returns empty string
*/
module.exports.getTargetedUser = (token, channel_id, channel_name, { locale, id }) => {
	const method = 'dialogs::slackMethods::getTargetedUser';
	Logger.info(method, 'get targeted user from conversations info', channel_id, channel_name, locale, id);
	return new Promise(function (resolve, reject) {
		if (channel_name === 'directmessage') {
			axios.get(`https://slack.com/api/conversations.info?token=${token}&channel=${channel_id}&pretty=1`)
				.then((result) => resolve(result.data.channel.user))
				.catch((err) => reject(err));
		} else {
			resolve('');
		}
	});
};
