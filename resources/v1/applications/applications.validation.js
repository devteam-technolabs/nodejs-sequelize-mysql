const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

module.exports = class ApplicationValidation {
    async create(req, res, next) {
        console.log('ApplicationValidation@create');
        if(!req.body.name || req.body.name === '') {
            return response.badRequest('name is required', res, false);
        }
        
        next();
    }

    async generateToken(req, res, next) {
        console.log('ApplicationValidation@generateToken');
        if(!req.params.applicationId || req.params.applicationId === '') {
            return response.badRequest('applicationId is required', res, false);
        }

        next();
    }
}