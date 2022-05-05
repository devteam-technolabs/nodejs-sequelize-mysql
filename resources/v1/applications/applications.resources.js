'use strict';
const hash = require('object-hash');

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const ApiTokenResource = require('../apiTokens/apiTokens.resources');
const _ApiToken = new ApiTokenResource();

const Application = require('./application.model');

module.exports = class ApplicationResource {
    async create(data) {
        console.log('ApplicationResource@create');
        let applicationData = {
            name: data.name,
            type: data.type,
            fcm_server_key: data.fcm_server_key,
        }

        let application = await Application.create(applicationData);
        return application;
    }

    async getAll() {
        console.log('ApplicationResource@getAll');
        let applications = await Application.findAll({
            include: ['api_tokens']
        });

        if(applications.length < 1) {
            return false;
        }

        return applications;
    }

    async getOne(applicationId) {
        console.log('ApplicationResource@getOne');
        let application = await Application.findByPk(applicationId);

        if(!application) {
            return false;
        }

        return application;
    }
}