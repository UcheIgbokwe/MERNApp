const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const user = sequelize.define('User', {
    Id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    CreatedAt:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, { timestamps: false, freezeTableName: true, });

module.exports = user;