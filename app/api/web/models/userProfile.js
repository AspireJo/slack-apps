class UserProfile {
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
  }

  static Instance(slackObject) {
    const userProfile = new UserProfile();
    userProfile.display_name = slackObject.display_name;
    userProfile.status_text = slackObject.status_text;
    userProfile.status_emoji = slackObject.status_emoji;
    userProfile.image = slackObject.image_512 || slackObject.image_192 || slackObject.image_72 || slackObject.image_48 || slackObject.image_32 || slackObject.image_24;
    return userProfile;
  }

  static SenderInstance(slackObject) {
    const userProfile = new UserProfile();
    if (slackObject) {
      userProfile.display_name = slackObject.display_name || slackObject.real_name;
      userProfile.image = slackObject.image_48;
    }
    return userProfile;
  }
};

module.exports = UserProfile;
