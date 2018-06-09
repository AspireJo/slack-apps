const Star = require('./../../../framework/Model/Star');

module.exports.saveGivenStars = (channel, { body, locale, id }) => {
    Logger.info('saveGivenStars:: start', { body, locale, id });

    return Star.Add(channel, { body, locale, id })
        .then(savedRecord => {
            Logger.info(savedRecord.get('identifier'));
        }).catch(err => {
            throw (err);
        });
}

module.exports.getGivenStarsInThisMonthByUser = ({ body, locale, id }) => {
    Logger.info('getGivenStarsInThisMonthByUser:: start', { body, locale, id });
    return givenStarsList = Star.GetGivenStarsInThisMonthByUser({ body, locale, id })
        .then(result => {
            return result
        }).catch(err => {
            throw (err);
        });
}

module.exports.getGainStarsInThisMonthByUser = ({ body, locale, id }) => {
    Logger.info('getGainStarsInThisMonthByUser:: start', { body, locale, id });
    return givenStarsList = Star.GetGainStarsInThisMonthByUser({ body, locale, id })
        .then(result => {
            return result
        }).catch(err => {
            throw (err);
        });
}

module.exports.CountOfGivenStarsInThisMonth = ({ body, locale, id }) => {
    Logger.info('CountOfGivenStarsInThisMonth:: start');

    return Star.CountOfGivenStarsInThisMonth({ body, locale, id })
        .then(result => {
            return Number(result[0].dataValues.count);
        }).catch(err => {
            throw (err);
        });
}

module.exports.CountOfGainStarsInThisMonth = ({ body, locale, id }) => {
    Logger.info('CountOfGainStarsInThisMonth:: start');

    return Star.CountOfGainStarsInThisMonth({ body, locale, id })
        .then(result => {
            return Number(result[0].dataValues.count);
        }).catch(err => {
            throw (err);
        });
}