const Sequelize = require('sequelize');
module.exports = {
    identifier: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    type: { type: Sequelize.STRING, allowNull: false },
    token: { type: Sequelize.STRING, allowNull: false },
    action: { type: Sequelize.STRING, allowNull: false },
    team_id: { type: Sequelize.STRING, allowNull: true },
    team_domain: { type: Sequelize.STRING, allowNull: true },
    action_user_id: { type: Sequelize.STRING, allowNull: false },
    action_user_name: { type: Sequelize.STRING, allowNull: false },
    channel_id: { type: Sequelize.STRING, allowNull: true },
    channel_name: { type: Sequelize.STRING, allowNull: true },
    receiver_id: { type: Sequelize.STRING, allowNull: false },
    stars_count: { type: Sequelize.INTEGER, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
    show_me: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    callback_id: { type: Sequelize.STRING, allowNull: true }
};
