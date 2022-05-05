const _ = require('lodash');

const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

module.exports = class ApiTokensValidation {
    async getAll(req, res, next) {
        console.log('ApiTokensValidation@getAll');

        next();
    }
}