module.exports = {
  token: AppConfigs.oAuthAccessToken,
  trigger_id: '',
  dialog: {
    title: 'Give a Star or more!',
    callback_id: 'submit-ticket',
    submit_label: 'Submit',
    elements: [
      {
        label: 'To',
        type: 'select',
        name: 'receiver',
        hint: 'Who would you like to give him the stars?',
        data_source: "users",
        value: ''
      },
      {
        label: 'How many star?',
        type: 'select',
        name: 'noOfStars',
        hint: 'How many star would you like to give?',
        value: '1',
        options: [
          { label: ':star2:', value: '1' },
          { label: ':star2: :star2:', value: '2' },
          { label: ':star2: :star2: :star2:', value: '3' },
          { label: ':star2: :star2: :star2: :star2:', value: '4' },
          { label: ':star2: :star2: :star2: :star2: :star2:', value: '5' },
        ],
      },
      {
        label: 'Why?',
        type: 'textarea',
        name: 'description',
        hint: 'Why would you like to give him/her star(s)?',
        optional: true,
      },
      {
        label: 'Show Your Name?',
        type: 'select',
        name: 'showMe',
        value: 'N',
        options: [
          { label: ':heavy_check_mark: Yes', value: 'Y' },
          { label: ':x: No', value: 'N' },
        ],
      },
    ],
  },
};