const Dialog = require('./Dialog');
const Element = require('./Element');
const SelectElement = require('./SelectElement');
const Option = require('./Option');
const MaxNumberOfStars = AppConfigs.maxNumberOfStarsPerMonth
class SlackDialog {
  constructor(token, trigger_id) {
    this.token = token;
    this.trigger_id = trigger_id;
    this.dialog = undefined;
  }

  static buildGiveAStarDialog(token, trigger_id, userId, remainingStars) {
    const starsDialog = new SlackDialog();

    const dialog = Dialog.Instance('Give a Star or more!', 'give-a-star', 'Submit');

    const receiverElements = SelectElement.Instance('receiver', 'To', 'users', userId, false, 'Who would you like to give him the stars?');
    dialog.elements.push(receiverElements);

    const noOfStarsElements = SelectElement.Instance('noOfStars', 'How many star?', null, 1, false, 'How many star would you like to give?');
    let i;
    let j;
    for (i = 1; i <= MaxNumberOfStars - remainingStars; i++) {
      let starIcons = '';
      for (j = 1; j <= i; j++) {
        starIcons += ':star2:';
      }
      noOfStarsElements.options.push(Option.Instance(starIcons, i.toString()));
    }
    /*noOfStarsElements.options.push(Option.Instance(':star2:', '1'));
    noOfStarsElements.options.push(Option.Instance(':star2::star2:', '2'));
    noOfStarsElements.options.push(Option.Instance(':star2::star2::star2:', '3'));
    noOfStarsElements.options.push(Option.Instance(':star2::star2::star2::star2:', '4'));
    noOfStarsElements.options.push(Option.Instance(':star2::star2::star2::star2::star2:', '5'));*/
    dialog.elements.push(noOfStarsElements);

    const descriptionElements = Element.Instance('textarea', 'description', 'Why?', null, true, 'Why would you like to give him/her star(s)?');
    dialog.elements.push(descriptionElements);

    const showMeElements = SelectElement.Instance('showMe', 'Why?', null, 'N', false, 'Why would you like to give him/her star(s)?');
    showMeElements.options.push(Option.Instance(':heavy_check_mark: Yes', 'Y'));
    showMeElements.options.push(Option.Instance(':x: No', 'N'));
    dialog.elements.push(showMeElements);
    starsDialog.token = token;
    starsDialog.trigger_id = trigger_id;
    starsDialog.dialog = JSON.stringify(dialog);
    return starsDialog;
  }
};

module.exports = SlackDialog;
