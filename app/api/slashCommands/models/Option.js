class Option {
  constructor() {
    this.label = undefined;
    this.value = undefined;
  }

  static Instance(label, value) {
    const option = new Option();
    option.label = label;
    option.value = value;
    return option;
  }
};

module.exports = Option;
