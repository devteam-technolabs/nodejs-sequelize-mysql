require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            decimalNumbers: true
        }
    },
    staging: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            decimalNumbers: true
        }
    },
    uat: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            decimalNumbers: true
        }
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            decimalNumbers: true
        }
    }
};