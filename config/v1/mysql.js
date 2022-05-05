require('dotenv').config();
const Sequelize = require('sequelize');

const mysqlUri = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB_NAME}`;

const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    operatorAliases: false,
    dialectOptions: {
        decimalNumbers: true
    },
});

sequelize.authenticate().then(() => {
    console.log('connected to mysql');
}).catch((err) => {
    console.log('error connecting to mysql: ', err.message);
});

module.exports = sequelize