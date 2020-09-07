const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const product = sequelize.define('ProductsTable', {
    Id:{
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ProductType:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false, freezeTableName: true});

module.exports = product;