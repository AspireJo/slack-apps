const _ = require('lodash');
const ControllerBase = require('./../../../framework/controller/controllerBase');
const Nominee = require('./../models/nominee');
const UserProfile = require('./../models/userProfile');
const schema = require('./../schema/nominees');
const actions = require('./../repository/actions');

class Nominees extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'Nominees';
	}

	static processRequest(req, res) {
		Logger.info(req, 'Nominees:: start');
		const teamId = req.params.teamId;

		return actions.GetNomineesInfo(teamId, req)
			.then((result) => {
				return Promise.all([
					actions.GetNomineeProfile(result, req),
					actions.getGainStarsInThisMonthByUser(teamId, result, req)
				])
					.then(allResult => {
						return actions.getSenderProfiles(allResult[1], req)
							.then(senderProfiles => {
								allResult[1].forEach(sender => {
									sender.forEach(message => {
										if(message.show_me === true){
											message.profile = UserProfile.SenderInstance(_.find(senderProfiles, { 'user_id' : message.action_user_id }));
										}
										delete message.action_user_id;
									});
								});
								return allResult;
							})
							.catch(err => {
								throw err;
							});
					})
					.then(allResult => {
						console.log(result);
						const nominees = [];
						let nominee;
						for (let i = 0; i < result.length; i++) {
							if (allResult[0][i]) {
								nominee = Nominee.Instance(allResult[0][i], result[i].count, allResult[1][i]);
								nominees.push(nominee);
							}
						}

						res.send({ nominees });
					})
					.catch((err) => {
						res.sendStatus(500);
						return;
					});
			})
			.catch((err) => {
				res.sendStatus(500);
				return;
			});
	}
}

module.exports.controller = (req, res) => Nominees.execute(req, res);
module.exports.route = '/nominees/:teamId';
// http://localhost:3000/api/v1/nominees/TAPHRRP8W