require('dotenv').config();
module.exports = class ResponseHelper {
    async success(msg, res, payload) {
        this.sendResponse(200, msg, res, payload);
    };

    async created(msg, res, payload) {
        this.sendResponse(201, msg, res, payload);
    };

    async noContent(msg, res, payload) {
        this.sendResponse(204, msg, res, payload);
    };

    async badRequest(msg, res, payload) {
        this.sendResponse(400, msg, res, payload);
    };

    async unauthorized(msg, res, payload) {
        this.sendResponse(401, msg, res, payload);
    };

    async forbidden(msg, res, payload) {
        this.sendResponse(403, msg, res, payload);
    };

    async notFound(msg, res, payload) {
        this.sendResponse(404, msg, res, payload);
    };

    async exception(msg, res, payload) {
        this.sendResponse(500, msg, res, payload);
    };

    async custom(code, msg, res, payload) {
        this.sendResponse(code, msg, res, payload);
    }

    async sendResponse(code, msg, res, payload) {
        if (!payload) {
            return res.status(code).send({
                api_ver: process.env.API_VER,
                msg: msg,
            });
        } else {
            return res.status(code).send({
                api_ver: process.env.API_VER,
                msg: msg,
                payload: payload,
            });
        }
    }
}