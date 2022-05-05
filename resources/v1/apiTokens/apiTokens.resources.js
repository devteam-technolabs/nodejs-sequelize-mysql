'use strict';

const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const ApiToken = require('./apiToken.model');

module.exports = class ApiTokensResource {
    async generateToken(applicationId, name, type) {
        console.log('ApiTokensResource@getAll');
        let token = await _DataHelper.generateHash(`${applicationId}+${name}+${type}`)
        let data = {
            application_id: applicationId,
            token: token,
            name: name,
            type: type,
        }

        let apiToken = await ApiToken.create(data);
        return apiToken;
    }

    async findByToken(token) {
        console.log('ApiTokensResource@getAll');
        let apiToken = await ApiToken.findOne({
            where: {
                token: token,
            },
            include: ['application'],
        })

        if(!apiToken) {
            return false;
        }

        return apiToken;
    }
}