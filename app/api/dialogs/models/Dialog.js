class Dialog {
  constructor() {
    this.title = undefined;
    this.callback_id = undefined;
    this.submit_label = undefined;
    this.elements = undefined;
  }

  static Instance(title, callback_id, submit_label) {
    const dialog = new Dialog();
    dialog.title = title;
    dialog.callback_id = callback_id;
    dialog.submit_label = submit_label;
    dialog.elements = [];
    return dialog;
  }
};

module.exports = Dialog;
