const ControllerBase = require('./../../../framework/controller/controllerBase');
const Nominee = require('./../models/nominee');
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
					actions.GetUserProfile(result, req),
					actions.getGainStarsInThisMonthByUser(teamId, result, req)
				])
					.then(allResult => {
						console.log(result);
						const nominees = [];
						let nominee;
						for(let i = 0; i < result.length; i++ ){
							nominee =Nominee.Instance(allResult[0][i], result[i].count, allResult[1][i]) ;
							nominees.push(nominee)
						}

						res.send({nominees});
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