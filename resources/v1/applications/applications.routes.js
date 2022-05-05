const express = require('express');
const routes = express.Router();

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const ApplicationController = require('./applications.controller');
const application = new ApplicationController();

const ApplicationValidation = require('./applications.validation');
const validate = new ApplicationValidation();

/**
 * routes
 */
routes.post('/', [auth.superAdmin, validate.create], application.create);

routes.post('/:applicationId/token', [auth.superAdmin, validate.generateToken], application.generateToken);

routes.get('/', [auth.superAdmin], application.getAll);

module.exports = routes;