class MessageBody {

  constructor() {
    this.token = undefined;
    this.channel = undefined;
    this.user = undefined;
    this.text = undefined;
    this.attachments = undefined;
  }

  static Instance(token, channel, user, text, attachments) {
    const messageBody = new MessageBody();
    messageBody.token = token ;
    messageBody.channel = channel;
    messageBody.user = user;
    messageBody.text = text;
    messageBody.attachments = JSON.stringify(attachments);
    return messageBody;
  }
}
module.exports = MessageBody;
