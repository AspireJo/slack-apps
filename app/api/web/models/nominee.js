class Nominee  {
  constructor() {

    this.title = undefined;
    this.phone = undefined;
    this.skype = undefined;
    this.real_name = undefined;
    this.real_name_normalized = undefined;
    this.display_name = undefined;
    this.display_name_normalized = undefined;
    this.fields = undefined;
    this.status_text = undefined;
    this.status_emoji = undefined;
    this.status_expiration = undefined;
    this.avatar_hash = undefined;
    this.email = undefined;
    this.image_24 = undefined;
    this.image_32 = undefined;
    this.image_48 = undefined;
    this.image_72 = undefined;
    this.image_192 = undefined;
    this.image_512 = undefined;
    this.image = undefined;
    this.status_text_canonical = undefined;
    
    this.totalStars = undefined;
    this.starsList = undefined;
  }

  static Instance(slackObject, totalStars, starsList) {
    const nominee = new Nominee();
    nominee.display_name = slackObject.display_name;
    nominee.status_text = slackObject.status_text;
    nominee.status_emoji = slackObject.status_emoji;
    nominee.image = slackObject.image_512 || slackObject.image_192 || slackObject.image_72 || slackObject.image_48 || slackObject.image_32 || slackObject.image_24;
    nominee.totalStars = totalStars;
    nominee.starsList = starsList;
    
    return nominee;
  }
};

module.exports = Nominee;
