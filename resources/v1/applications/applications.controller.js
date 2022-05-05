const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ApplicationResource = require('./applications.resources');
const _Application = new ApplicationResource();

const ApiTokenResource = require('../apiTokens/apiTokens.resources');
const _ApiToken = new ApiTokenResource();

module.exports = class ApplicationController {
    async create(req, res) {
        console.log('ApplicationController@create');
        let data = _.pick(req.body, ['name']);

        let application = await _Application.create(data);

        return response.created('application successfully created', res, application);
    }

    async generateToken(req, res) {
        console.log('ApplicationController@generateToken');
        // check if the application exists
        let application = await _Application.getOne(parseInt(req.params.applicationId));

        if(!application) {
            return response.notFound('application not found', res, false);
        }

        let apiToken = await _ApiToken.generateToken(application.id, req.body.name, req.body.type);

        if(!apiToken) {
            return response.exception('error generating api token', res, false);
        }

        return response.created('api token created', res, apiToken);
    }

    async getAll(req, res) {
        console.log('ApplicationController@getAll');
        let applications = await _Application.getAll();

        if(!applications) {
            return response.notFound('no applications found', res, false);
        }

        return response.success('applications found', res, applications);
    }
}