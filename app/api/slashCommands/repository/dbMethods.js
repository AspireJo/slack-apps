const Star = require('./../../../framework/Model/Star');

module.exports.CountOfGivenStarsInThisMonth = ({ body, locale, id }) => {
    Logger.info('CountOfGivenStarsInThisMonth:: start');

    return Star.CountOfGivenStarsInThisMonth({ body, locale, id })
        .then(result => {
            return Number(result[0].dataValues.count);
        }).catch(err => {
            throw (err);
        });
}