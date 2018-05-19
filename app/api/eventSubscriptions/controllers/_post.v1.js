const ControllerBase = require('./../../../framework/controller/controllerBase');
const schema = require('./../schema/eventSubscriptions');
const Errors = require('./../../../framework/errors');
const slackMethod = require('./../repository/slackMethods');

class EventSubscriptions extends ControllerBase {
	static get schema() {
		return schema;
	}

	static validate(req) {
		const { body } = req;
		if (body.token !== AppConfigs.verificationToken) {
			throw new Errors.MISSING_TOKEN();
		}

		if (body.type === 'url_verification' && !body.challenge) {
			throw new Errors.MISSING_CHALLENGE();
		}
		return true;
	}

	static get name() {
		return 'EventSubscriptions';
	}

	static processRequest(req, res) {
		this.log(req, 'event-subscriptions:: start');
		const { body } = req;

		// url_verification
		if (body.type === 'url_verification' && body.challenge) {
			return res.json(body.challenge);
		}

		if (body.event) {
			// Filter out messages from this bot itself or updates to messages
			if (body.event.subtype === 'bot_message' || body.event.subtype === 'message_changed' || body.event.subtype === 'message_deleted') {
				return;
			}
			return slackMethod.handleDirectMessage(body.event.user, body.event.channel, body.event.text, req);
		}
	}
}

module.exports.controller = (req, res) => EventSubscriptions.execute(req, res);
module.exports.route = '/event-subscriptions';