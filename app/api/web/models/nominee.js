const userProfile = require('./userProfile');

class Nominee extends userProfile  {
  constructor() {
    super();    
    this.totalStars = undefined;
    this.starsList = undefined;
  }

  static Instance(slackObject, totalStars, starsList) {
    const nominee = new Nominee();
    nominee.display_name = slackObject.display_name || slackObject.real_name;
    nominee.status_text = slackObject.status_text;
    nominee.status_emoji = slackObject.status_emoji;
    nominee.image = slackObject.image_192;
    nominee.totalStars = totalStars;
    nominee.starsList = starsList;
    
    return nominee;
  }
};

module.exports = Nominee;
