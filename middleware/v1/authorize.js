'use strict';
require('dotenv').config();
const ResponseHelper = require('../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const ApplicationResource = require('../../resources/v1/applications/applications.resources');
const _Application = new ApplicationResource();

const ApiTokenResource = require('../../resources/v1/apiTokens/apiTokens.resources');
const _ApiToken = new ApiTokenResource();

module.exports = class AuthorizationMiddleware {
    superAdmin(req, res, next) {
        console.log('AuthorizationMiddleware@superAdmin');
        if (!req.headers['unoapp-token'] || req.headers['unoapp-token'] === '') {
            return response.forbidden('unoapp token is required', res, false);
        }

        let unoappToken = process.env.UNOAPP_TOKEN;
        if (req.headers['unoapp-token'] !== unoappToken) {
            return response.unauthorized('invalid unoapp-token', res, false);
        }

        next()
    }

    async api(req, res, next) {
        console.log('AuthorizationMiddleware@api');
        if (!req.headers['api-token']) {
            return response.unauthorized('missing api token', res, false);
        }

        let token = req.headers['api-token']

        let apiToken = await _ApiToken.findByToken(token);

        if (!apiToken) {
            return response.unauthorized('invalid api token', res, false);
        }

        if (!apiToken.active) {
            return response.unauthorized('api token is no longer valid', res, false);
        }

        if (!apiToken.application.active) {
            return response.forbidden('application is no longer available', res, false);
        }

        req.body.application_id = apiToken.application.id;
        req.body.access_level = apiToken.type;

        next()
    }

    async unoapp(req, res, next) {
        console.log('AuthorizationMiddleware@unoapp');
        // only unoapp apps can make this request
        if (req.body.access_level !== 'unoapp') {
            return response.forbidden('you do not have access to this feature', res, false);
        }

        next();
    }
}