const Sequelize = require('sequelize');
const Sequalizer = require('./Sequalizer');
const tableName = 'STAR';
class Star extends Sequalizer {

    constructor() {
        super();
        this.identifier = { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 };
        this.type = { type: Sequelize.STRING, allowNull: false };
        this.token = { type: Sequelize.STRING, allowNull: false };
        this.action = { type: Sequelize.STRING, allowNull: false };
        this.team_id = { type: Sequelize.STRING, allowNull: true };
        this.team_domain = { type: Sequelize.STRING, allowNull: true };
        this.action_user_id = { type: Sequelize.STRING, allowNull: false };
        this.action_user_name = { type: Sequelize.STRING, allowNull: false };
        this.channel_id = { type: Sequelize.STRING, allowNull: true };
        this.channel_name = { type: Sequelize.STRING, allowNull: true };
        this.receiver_id = { type: Sequelize.STRING, allowNull: false };
        this.stars_count = { type: Sequelize.INTEGER, allowNull: false };
        this.description = { type: Sequelize.STRING, allowNull: true };
        this.show_me = { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false };
        this.callback_id = { type: Sequelize.STRING, allowNull: true };
        this.target_channel = { type: Sequelize.STRING, allowNull: true };
    }

    static Init() {
        const star = new Star();
        const tableInstance = super.define(tableName, star);
        super.sync(tableInstance);
    }

    static Add(channel, body, { locale, id }) {
        const star = new Star();
        const tableInstance = super.define(tableName, star);
        star.identifier = undefined;
        star.type = body.type;
        star.token = body.token;
        star.action = body.action_ts;
        star.team_id = body.team.id;
        star.team_domain = body.team.domain;
        star.action_user_id = body.user.id;
        star.action_user_name = body.user.name;
        star.channel_id = body.channel.id;
        star.channel_name = body.channel.name;
        star.receiver_id = body.submission.receiver;
        star.stars_count = body.submission.noOfStars;
        star.description = body.submission.description;
        star.show_me = (body.submission.showMe === 'Y');
        star.callback_id = body.callback_id;
        star.target_channel = channel;
        tableInstance.create(star)
            .then(savedRecord => {
                console.log(savedRecord.get('identifier'));
            }).catch(err => {
                console.log(err);
            });
        ;
    }

    static CountOfGivenStarsInThisMonth(body, { locale, id }) {
        const star = new Star();
        const tableInstance = super.define(tableName, star);
        const date = new Date();
        return tableInstance.findAll({
            attributes: [[Sequelize.fn('SUM', Sequelize.col('stars_count')), 'count']],
            where: {
                [Sequelize.Op.and]: [
                    { action_user_id: body.user_id },
                    { team_id: body.team_id },
                    {
                        createdAt: {
                            [Sequelize.Op.gt]: new Date(date.getFullYear(), date.getMonth(), 1),
                            [Sequelize.Op.lt]: new Date(date.getFullYear(), date.getMonth() + 1, 0)
                        }
                    }
                ]
            }
        })
            .then(result => {
                console.log(Number(result[0].dataValues.count));
                return Number(result[0].dataValues.count);
            }).catch(err => {
                console.log(err);
                throw (err);
            });
    }

}
module.exports = Star;