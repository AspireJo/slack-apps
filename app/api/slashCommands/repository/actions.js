const dbMethod = require('./dbMethods');
const slackMethod = require('./slackMethods');
const slackDialog = require('./../models/SlackDialog');
const interactiveComponentActions = require('./../../interactiveComponent/repository/actions');

/*  giveStars
*    call a get api from slack to get the conversations info and then extract the targeted user
*   Param targeted channel
*   Param user, the sender
*   Param args, submitted dialog's data
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.getUserInfo = ({ body, locale, id }) => {
	const method = 'dialogs::actions::getUserInfo';
	Logger.info(method, 'get user info from slack and DB', locale, id);

	return Promise.all([
		// STEP 1::get targeted user info
		slackMethod.getTargetedUser(AppConfigs.oAuthAccessToken, {body, locale, id }),
		// STEP 2:: get count of given stars in this month from DB
		dbMethod.CountOfGivenStarsInThisMonth({ body, locale, id })
	]);
};

module.exports.showDialogToSlackUser = (slackUserInfo, countOfGivenStars, { body, locale, id }) => {
	const method = 'dialogs::actions::getUserInfo';
	Logger.info(method, 'get user info from slack and DB', slackUserInfo, countOfGivenStars, body);
	const { trigger_id } = body;

	// Build dialog
	const dialog = slackDialog.buildGiveAStarDialog(AppConfigs.oAuthAccessToken, trigger_id, slackUserInfo, countOfGivenStars);

	// open dialog on slack
	return slackMethod.openDialog(dialog, { locale, id });
};

module.exports.PostShortStarsReportMessage = (initialText, { body, locale, id }) => {

	return interactiveComponentActions.PostShortStarsReportMessage(initialText, { body, locale, id });
}

module.exports.ShowErrorMessageToSlackUser = (text, {body, locale, id }) => {
	return interactiveComponentActions.ShowErrorMessageToSlackUser(text, {body, locale, id });
}

