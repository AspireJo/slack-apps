const axios = require('axios');
const qs = require('querystring');

/*  handleDirectMessage
*   Call a post api from slack to postMessage for user
*   Param userId
*	  Param channelId
*   Param locale(string), defines the locale shortname, exists in the request. ex: JO
*   Param id(number), reuqest id. generated in the request.
*   Output: promise of of calling slack api
*/
module.exports.handleDirectMessage = (userId, channel, text, { locale, id }) => {
  const method = 'interactiveComponent::slackMethods::postMessage';
  Logger.info(method, 'send message to slack', locale, id);
  messageBody = {
    token: AppConfigs.oAuthAccessToken,
    channel,
    text: `:wave: <@${userId}>,`,
    attachments: [
      {
        text: ' Would you like to give your colleagues some stars?',
        callback_id: 'give-a-star-button',
        color: 'warning',
        attachment_type: 'default',
        actions: [
          {
            name: 'give-a-star',
            text: 'Yes, let\'s do it',
            type: 'button',
            value: 'give-a-star',
            style: 'primary'
          },
          {
            name: 'cancel',
            text: 'No, i\'m not in the mood',
            type: 'button',
            value: 'cancel',
            style: 'danger'
          }
        ]
      }
    ]
  };

  messageBody.attachments = JSON.stringify(messageBody.attachments);
  return axios.post('https://slack.com/api/chat.postMessage', qs.stringify(messageBody));
};