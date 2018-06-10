const axios = require('axios');
const qs = require('querystring');

/*  getUserProfile
*    call a get api from slack to get user profile
*   Param userId
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api with the user id
*/
module.exports.getUserProfile = (userId, { locale, id }) => {
	const method = 'web::slackMethods::getUserProfile';
	//Logger.info(method, 'get user profile from slack', userId, locale, id);

	return axios.get(`https://slack.com/api/users.profile.get?token=${AppConfigs.oAuthAccessToken}&user=${userId}&pretty=1`)
		.then(result => {
			if (result.data && result.data.profile) {
				result.data.profile.user_id = userId;
			}
			return result;
		});
};