require('dotenv').config();
const axios = require('axios');

module.exports = class ApiServiceHelpers {
    async locationsApi(reqMethod, reqEndpoint, reqBody) {
        console.log('ApiServiceHelpers@locationsApi');
        let request;

        if (!reqBody) {
            try {
                request = await axios[reqMethod](`${process.env.LOCATIONS_API_URL}${reqEndpoint}`, {
                    headers: {
                        'api-token': process.env.LOCATIONS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        } else {
            try {
                request = await axios[reqMethod](`${process.env.LOCATIONS_API_URL}${reqEndpoint}`, reqBody, {
                    headers: {
                        'api-token': process.env.LOCATIONS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        }

        if (request.status < 200 || request.status > 299) {
            console.log('error sending ', request.data);
            return {
                error: true,
                msg: request.data.msg,
                code: request.status,
            }
        }

        return request.data.payload;
    }

    async wifiTrafficApi(reqMethod, reqEndpoint, reqBody) {
        console.log('ApiServiceHelpers@wifiTrafficApi');
        let request;

        if (!reqBody) {
            try {
                request = await axios[reqMethod](`${process.env.WIFI_TRAFFIC_API_URL}${reqEndpoint}`, {
                    headers: {
                        'api-token': process.env.WIFI_TRAFFIC_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        } else {
            try {
                request = await axios[reqMethod](`${process.env.WIFI_TRAFFIC_API_URL}${reqEndpoint}`, reqBody, {
                    headers: {
                        'api-token': process.env.WIFI_TRAFFIC_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        }

        if (request.status < 200 || request.status > 299) {
            console.log('error sending ', request.data);
            return {
                error: true,
                msg: request.data.msg,
                code: request.status,
            }
        }

        return request.data.payload;
    }

    async signageApi(reqMethod, reqEndpoint, reqBody) {
        console.log('ApiServiceHelpers@signageApi');
        let request;

        if (!reqBody) {
            try {
                request = await axios[reqMethod](`${process.env.SIGNAGE_API_URL}${reqEndpoint}`, {
                    headers: {
                        'api-token': process.env.SIGNAGE_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        } else {
            try {
                request = await axios[reqMethod](`${process.env.SIGNAGE_API_URL}${reqEndpoint}`, reqBody, {
                    headers: {
                        'api-token': process.env.SIGNAGE_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.message,
                    code: 500,
                }
            }
        }

        if (request.status < 200 || request.status > 299) {
            console.log('error sending ', request.data);
            return {
                error: true,
                msg: request.data.msg,
                code: request.status,
            }
        }

        return request.data.payload;
    }

    async smsApi(reqMethod, reqEndpoint, reqBody) {
        console.log('ApiServiceHelpers@smsApi');
        let request;

        if (!reqBody) {
            try {
                request = await axios[reqMethod](`${process.env.SMS_API_URL}${reqEndpoint}`, {
                    headers: {
                        'api-token': process.env.SMS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR: ', err.response.data)
                console.log('STATUS CODE: ', err.response.status)
                if (err.response.status < 200 || err.response.status > 299) {
                    return {
                        error: true,
                        msg: err.response.data.msg,
                        code: err.response.status
                    }
                } else {
                    return {
                        error: true,
                        msg: err.message,
                        code: 500,
                    }
                }
            }
        } else {
            try {
                request = await axios[reqMethod](`${process.env.SMS_API_URL}${reqEndpoint}`, reqBody, {
                    headers: {
                        'api-token': process.env.SMS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR: ', err.response.data)
                console.log('STATUS CODE: ', err.response.status)
                if (err.response.status < 200 || err.response.status > 299) {
                    return {
                        error: true,
                        msg: err.response.data.msg,
                        code: err.response.status
                    }
                } else {
                    return {
                        error: true,
                        msg: err.message,
                        code: 500,
                    }
                }
            }
        }

        if (request.status < 200 || request.status > 299) {
            console.log('error sending ', request.data);
            return {
                error: true,
                msg: request.data.msg,
                code: request.status,
            }
        }

        return request.data.payload;
    }

    async appPermissionsApi(reqMethod, reqEndpoint, reqBody) {
        console.log('ApiServiceHelpers@appPermissionsApi');
        let request;

        if (!reqBody) {
            try {
                request = await axios[reqMethod](`${process.env.APP_PERMISSIONS_API_URL}${reqEndpoint}`, {
                    headers: {
                        'api-token': process.env.APP_PERMISSIONS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR: ', err.response.data)
                console.log('STATUS CODE: ', err.response.status)
                if (err.response.status < 200 || err.response.status > 299) {
                    return {
                        error: true,
                        msg: err.response.data.msg,
                        code: err.response.status
                    }
                } else {
                    return {
                        error: true,
                        msg: err.message,
                        code: 500,
                    }
                }
            }
        } else {
            try {
                request = await axios[reqMethod](`${process.env.APP_PERMISSIONS_API_URL}${reqEndpoint}`, reqBody, {
                    headers: {
                        'api-token': process.env.APP_PERMISSIONS_API_TOKEN,
                    }
                })
            } catch (err) {
                console.log('REQ URL: ', err.response.config.url);
                console.log('REQ HEADERS: ', err.response.config.headers);
                console.log('ERROR MAKING REQUEST: ', err.response);
                return {
                    error: true,
                    msg: err.response.data.msg,
                    code: err.response.status,
                }
            }
        }

        if (request.status < 200 || request.status > 299) {
            console.log('error sending ', request.data);
            return {
                error: true,
                msg: request.data.msg,
                code: request.status,
            }
        }

        return request.data.payload;
    }
}