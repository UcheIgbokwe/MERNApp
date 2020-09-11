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
        allowNull: false,
        validate: {
            isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    Password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: { 
               args: [5, 12],
               msg: "The password length should be between 7 and 42 characters."
            }
        }
    },
    CreatedAt:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, { timestamps: false, freezeTableName: true});

module.exports = user;