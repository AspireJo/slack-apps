const Sequelize = require('sequelize');
const Sequalizer = require('./Sequalizer');
class Star extends Sequalizer {
    static tableName = 'stars';
    constructor() {
        this.identifier = undefined;
        this.type = undefined;
        this.token = undefined;
        this.action = undefined;
        this.team_id = undefined;
        this.team_domain = undefined;
        this.action_user_id = undefined;
        this.action_user_name = undefined;
        this.channel_id = undefined;
        this.channel_name = undefined;
        this.receiver_id = undefined;
        this.stars_count = undefined;
        this.description = undefined;
        this.show_me = undefined;
        this.callback_id = undefined;
    }

    static Init() {
        const star = new Star();
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
        CreateAlterTable(tableName, star);
    }

    static Add(obj) {
        const star = new Star();
        this.type = 'Test';
        this.token = 'Test'};
        this.action = 'Test'};
        this.team_id = 'Test';
        this.team_domain = 'Test';
        this.action_user_id = 'Test'};
        this.action_user_name = 'Test'};
        this.channel_id = 'Test';
        this.channel_name = 'Test';
        this.receiver_id = 'Test'};
        this.stars_count = 2;
        this.description = 'Test';
        this.show_me = false;
        this.callback_id = 'Test';
        Add(star);
    }

    /*static FindByUserId(token, user, sequalizer) {
        const star = new Star();

        return star;
    }*/
}
module.exports = Dialog;