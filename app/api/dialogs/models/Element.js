class Element {
  constructor(type, name, label, value, optional, hint) {
    this.type = type;
    this.name = name;
    this.label = label;
    this.value = value;
    this.optional = optional;
    this.hint = hint;
  }

  static Instance(type, name, label, value, optional, hint) {
    const element = new Element(type, name, label, value, optional, hint);
    return element;
  }
};

module.exports = Element;
