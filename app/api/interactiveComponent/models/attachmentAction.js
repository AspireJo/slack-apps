class AttachmentAction {

  constructor() {
    this.name = undefined;
    this.text = undefined;
    this.type = undefined;
    this.value = undefined;
    this.style = undefined;
  }

  static Instance(name, text, type, value, style) {
    const attachmentAction = new AttachmentAction();
    attachmentAction.name = name ;
    attachmentAction.text = text;
    attachmentAction.type = type;
    attachmentAction.value = value;
    attachmentAction.style = style;
    return attachmentAction;
  }
}
module.exports = AttachmentAction;
