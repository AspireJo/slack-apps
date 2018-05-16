const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/dialogSubmission');
const dialogsActions = require('./../repository/dialogsActions');

class ClientInfoController extends ControllerBase {
	static get schema() {
		return schema;
	}

	static get name() {
		return 'DialogSubmission';
	}

	static processRequest(req, res) {
		this.log(req, 'dialog submission:: start');
		const body = JSON.parse(req.body.payload);

		// retur the response, no need to wait for submittion actions
		res.send('');

		return dialogsActions.giveStars('#test', body.user, body.submission, req)
			.then(() => { return null; })
			.catch((err) => res.sendStatus(500));
	}
}

module.exports.controller = (req, res) => ClientInfoController.execute(req, res);
module.exports.route = '/interactive-component';
