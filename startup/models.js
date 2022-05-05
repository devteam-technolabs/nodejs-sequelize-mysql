'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../config/v1/mysql');

const ApplicationModel = require('../resources/v1/applications/application.model');
const ApiTokenModel = require('../resources/v1/apiTokens/apiToken.model');
const RequestLogModel = require('../resources/v1/common/requestLog.model');

const models = {
    Application: ApplicationModel.init(sequelize, Sequelize),
    RequestLog: RequestLogModel.init(sequelize, Sequelize),
    ApiToken: ApiTokenModel.init(sequelize, Sequelize),
}

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    models,
    sequelize,
}

module.exports = db;