const Star = require('./../../../framework/Model/Star');

module.exports.GetNomineesForThisMonth = (teamId, { locale, id }) => {
    Logger.info('GetNomineesForThisMonth:: start');

    return Star.GetNomineesForThisMonth(teamId, { locale, id })
        .then(result => {
            return result;
        }).catch(err => {
            throw (err);
        });
}

module.exports.getGainStarsInThisMonthByUser = (body, { locale, id }) => {
    Logger.info('getGainStarsInThisMonthByUser:: start', { body, locale, id });
    return givenStarsList = Star.GetGainStarsInThisMonthByUser({ body, locale, id })
        .then(result => {
            return result
        }).catch(err => {
            throw (err);
        });
}