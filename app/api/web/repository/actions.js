const _ = require('lodash');
const dbMethod = require('./dbMethods');
const slackMethod = require('./slackMethods');
const Nominee = require('./../models/Nominee');

/*  GetNomineesInfo
*    get  Nominees for this month
*   Param teamId
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api.
*/
module.exports.GetNomineesInfo = (teamId, { locale, id }) => {
	const method = 'web::actions::GetNomineesInfo';
	Logger.info(method, 'get Nominees then pull their info from slack and DB', locale, id);

	return dbMethod.GetNomineesForThisMonth(teamId, { locale, id })
		.then(result => {
			return _.map(result, 'dataValues');
		}).catch(err => {
			throw (err);
		});
};

module.exports.GetNomineeProfile = (nominees, { locale, id }) => {
	const method = 'web::actions::GetUserProfile';
	//Logger.info(method, 'get user profile from slack', locale, id);
	const promises = [];
	nominees.forEach(nominee => {
		promises.push(new Promise(function (resolve, reject) {
			slackMethod.getUserProfile(nominee.receiver_id, { locale, id })
				.then((result) => resolve(result))
				.catch((err) => reject(err));

		}));
	});
	return Promise.all(promises)
		.then((result) => {
			return _.map(result, 'data.profile');
		}).catch((err) => {
			throw err;
		});
};

module.exports.getSenderProfiles = (senders, { locale, id }) => {
	const method = 'web::actions::GetUserProfile';
	const promises = [];
	let allMessages = [];
	senders.forEach(sender => {
		sender.forEach(message => {
			allMessages.push(message);
		});
	});
	const uniqSenders = _.uniqBy(_.filter(allMessages, ['show_me', true]), 'action_user_id');

	uniqSenders.forEach(sender => {
		promises.push(new Promise(function (resolve, reject) {
			slackMethod.getUserProfile(sender.action_user_id, { locale, id })
				.then((result) => resolve(result))
				.catch((err) => reject(err));
		}));
	});
	return Promise.all(promises)
		.then((result) => {
			return _.map(result, 'data.profile');
		}).catch((err) => {
			throw err;
		});
};

module.exports.getGainStarsInThisMonthByUser = (teamId, nominees, { locale, id }) => {
	const method = 'web::actions::getGainStarsInThisMonthByUser';
	//Logger.info(method, 'get gain stars from DB', locale, id);

	const promises = [];
	nominees.forEach(nominee => {
		promises.push(new Promise(function (resolve, reject) {
			dbMethod.getGainStarsInThisMonthByUser({ team_id: teamId, user_id: nominee.receiver_id }, { locale, id })
				.then((result) => {
					return _.map(result, 'dataValues');
				})
				.then(result => resolve(result))
				.catch((err) => reject(err));

		}));
	});

	return Promise.all(promises)
		.then((result) => {
			return result;
		}).catch((err) => {
			throw err;
		});
};