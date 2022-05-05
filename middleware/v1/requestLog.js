'use strict';

const RequestLog = require('../../resources/v1/common/requestLog.model');

module.exports = class RequestLogMiddleware {
    async logRequest(req, res, next) {
        console.log('RequestLogMiddleware@logRequest');
        let logBody = {};
        logBody = Object.assign(logBody, req.body)

        let requestData = {
            host: req.get('host'),
            method: req.method,
            api_token: req.headers['api-token'],
            user_agent: req.headers['user-agent'],
            base_url: req.baseUrl,
            full_url: req.originalUrl,
            ip: req.ip,
            route: req.route.path,
            body: logBody,
        }

        RequestLog.create(requestData);

        next();
    }
}