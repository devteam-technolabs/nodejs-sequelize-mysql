const axios = require('axios');

const DataHelpers = require('../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

module.exports = class WebParser {
    async getRawHtml(webUrl) {
        console.log('WebParser@getRawHtml');
        // get the raw html
        let rawHtml = await axios.get(webUrl, {});

        return rawHtml.data;
    }
}