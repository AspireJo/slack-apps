class MessageAttachment {

  constructor() {
    this.text = undefined;
    this.fallback = undefined;    
    this.callback_id = undefined;
    this.color = undefined;
    this.attachment_type = undefined;
    this.actions = undefined;
  }

  static Instance(text, callback_id, fallback, color, attachment_type, actions) {
    const messageAttachment = new MessageAttachment();
    messageAttachment.text = text ;
    messageAttachment.callback_id = callback_id;
    messageAttachment.fallback = fallback;
    messageAttachment.color = color;
    messageAttachment.attachment_type = attachment_type;
    messageAttachment.actions = actions;
    return messageAttachment;
  }
}
module.exports = MessageAttachment;
