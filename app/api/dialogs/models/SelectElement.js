const Element = require('./Element');

class SelectElement extends Element {
  constructor(type, name, label, value, optional, hint) {
    super(type, name, label, value, optional, hint);
    this.data_source = undefined;
    this.options = undefined;
  }

  static Instance(name, label, data_source, value, optional, hint) {
    const selectElement = new SelectElement('select', name, label, value, optional, hint);
    selectElement.data_source = data_source;
    if (data_source) {
      selectElement.options = undefined;
    } else {
      selectElement.options = [];
    }
    return selectElement;
  }
};

module.exports = SelectElement;
