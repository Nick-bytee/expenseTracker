const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('expensetracker', 'nickbytee', 'nickbytee123', {host : 'expensetracker.cam4d2fwai8i.us-east-1.rds.amazonaws.com', dialect : process.env.DB_DIALECT})

module.exports = sequelize