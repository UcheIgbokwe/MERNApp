const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const place = sequelize.define('Place', {
    Id:{
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ImageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Location:{
        type: Sequelize.TEXT,
        get: function() {
            return JSON.parse(this.getDataValue("Location"));
        },
        set: function(value) {
            return this.setDataValue("Location", JSON.stringify(value));
        },
        allowNull: false
    },
    Address:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Creator:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false, freezeTableName: true});

module.exports = place;