require('dotenv').config();
const axios = require('axios');

const DataHelpers = require('../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const WebUtils = require('../utils/web.utils');
const _WebUtil = new WebUtils();

const hoursInDay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

module.exports = class GoogleServices {
    async getAddress(address = null, city = null, country = null, businessName = null) {
        console.log('GoogleServices@getAddress');
        if (!address || !city || !country) {
            throw new Error('address/city/country are all required');
        }

        let searchAddress = encodeURIComponent(`${businessName}+${address}+${city}+${country}`);

        console.log(searchAddress);
        let googleAddress;

        try {
            googleAddress = await axios.get(`${process.env.GOOGLE_GEOCODE_URL}/json?address=${searchAddress}&key=${process.env.GOOGLE_MAPS_KEY}`, {});

        } catch (err) {
            console.log('ERROR GETTING GOOGLE ADDRESS: ', err.response);
            throw new Error('error: ', err.response)
        }

        let googleData = googleAddress.data;
        // console.log(JSON.stringify(googleData))
        let fullAddress = {
            formatted_address: googleData.results[0].formatted_address ? googleData.results[0].formatted_address : '',
            address_line_1: null,
            address_line_2: null,
            city: null,
            postal_code: null,
            country: null,
            longitude: googleData.results[0].geometry.location.lng,
            latitude: googleData.results[0].geometry.location.lat,
            place_id: googleData.results[0].place_id ? googleData.results[0].place_id : '',
        };

        let comp = googleData.results[0].address_components;
        for (let x = 0; x < comp.length; x++) {
            if (comp[x].types.includes('street_number')) {
                fullAddress.address_line_1 = (comp[x].long_name);
            }

            if (comp[x].types.includes('route')) {
                fullAddress.address_line_1 += ` ${comp[x].long_name}`;
            }

            if (comp[x].types.includes('locality') || comp[x].types.includes('sublocality')) {
                fullAddress.city = comp[x].long_name;
            }

            if (comp[x].types.includes('administrative_area_level_1') && comp[x].types.includes('political')) {
                fullAddress.province = comp[x].long_name;
            }

            if (comp[x].types.includes('country')) {
                fullAddress.country = comp[x].short_name;
            }

            if (comp[x].types.includes('postal_code')) {
                fullAddress.postal_code = comp[x].long_name;
            }
        }

        return fullAddress
    }

    async getTimezone(latitude = null, longitude = null) {
        console.log('GoogleServices@getTimezone');
        if (!latitude || !longitude) {
            throw new Error('latitude/longitude are both required');
        }

        let timezone;

        let currentTimestamp = Math.floor(new Date() / 1000)
        console.log(currentTimestamp);
        try {
            timezone = await axios.get(`${process.env.GOOGLE_TIMEZONE_URL}/json?location=${latitude},${longitude}&timestamp=${currentTimestamp}&key=${process.env.GOOGLE_MAPS_KEY}`, {});

        } catch (err) {
            console.log('ERROR GETTING GOOGLE TIMEZONE: ', err.response);
            throw new Error('error: ', err.response)
        }

        return timezone.data;
    }

    async getPlaceDetails(placeId = null) {
        console.log('GoogleServices@getPlaceDetails');
        if (!placeId) {
            throw new Error('placeId is required');
        }

        let placeDetails;
        try {
            placeDetails = await axios.get(`${process.env.GOOGLE_PLACE_DETAILS_URL}/json?key=${process.env.GOOGLE_MAPS_KEY}&placeid=${placeId}`, {});

        } catch (err) {
            console.log('ERROR GETTING GOOGLE ADDRESS: ', err.response);
            throw new Error('error: ', err.response)
        }

        let googleData = placeDetails.data;

        let googleHours = null;
        if (googleData.result.hasOwnProperty('opening_hours')) {
            googleHours = googleData.result.opening_hours.periods;
        }

        let fullAddress = {
            formatted_address: googleData.result.formatted_address ? googleData.result.formatted_address : '',
            address_line_1: null,
            address_line_2: null,
            city: null,
            postal_code: null,
            country: null,
            longitude: googleData.result.geometry.location.lng,
            latitude: googleData.result.geometry.location.lat,
            place_id: googleData.result.place_id ? googleData.result.place_id : '',
            maps_url: googleData.result.url ? googleData.result.url : null,
            international_phone_number: googleData.result.international_phone_number ? googleData.result.international_phone_number : null,
            formatted_phone_number: googleData.result.formatted_phone_number ? googleData.result.formatted_phone_number : null,
            website_url: googleData.result.website ? googleData.result.website : null,
            google_hours: googleHours,
        };

        let comp = googleData.result.address_components;
        for (let x = 0; x < comp.length; x++) {
            if (comp[x].types.includes('street_number')) {
                fullAddress.address_line_1 = (comp[x].long_name);
            }

            if (comp[x].types.includes('route')) {
                fullAddress.address_line_1 += ` ${comp[x].long_name}`;
            }

            if (comp[x].types.includes('locality')) {
                fullAddress.city = comp[x].long_name;
            }

            if (comp[x].types.includes('administrative_area_level_1') && comp[x].types.includes('political')) {
                fullAddress.province = comp[x].long_name;
            }

            if (comp[x].types.includes('country')) {
                fullAddress.country = comp[x].short_name;
            }

            if (comp[x].types.includes('postal_code')) {
                fullAddress.postal_code = comp[x].long_name;
            }
        }

        return fullAddress;
    }

    async getPopularTimes(formattedAddress, googlePlaceId) {
        console.log('GoogleServices@getPopularTimes');
        formattedAddress = encodeURIComponent(formattedAddress);
        // get the raw html
        let parsedData = await _WebUtil.getRawHtml(`https://www.google.com/maps/search/?api=1&query=${formattedAddress}&query_place_id=${googlePlaceId}`);

        let startPosition = parsedData.indexOf('[[[7,');

        let checkData = parsedData.substring(startPosition);

        // split at the searchresult text
        checkData = checkData.split('SearchResult.')[0];

        // get the index at the last occurrence of ]
        let finalCut = checkData.lastIndexOf(']');

        // get the final string
        checkData = checkData.substring(2, finalCut);

        // replace all random characters e.g. //, "\", etc
        checkData = await _DataHelper.cleanGmapsHtml(checkData);

        // convert data into JSON
        let popularTimesData = JSON.parse(`[[${checkData}]`)[0];

        // return popularTimesData;

        let popularTimes = [];
        for (let x = 1; x < (popularTimesData.length + 1); x++) {
            let dayData = popularTimesData[x];

            if (!dayData) {
                console.log('NO DAY DATA FOUND: ', dayData);
                continue;
            }

            // if no data exists for the day, add single array so that it gets into loop
            if (!(dayData[1])) {
                dayData[1] = []
                for (let x = 0; x < 24; x++) {
                    dayData[1].push([0, 0, '', '', '12 a.m.'])
                }
            }

            // create an object to store the data
            let newDayData = {
                day: x,
                hourlyData: [],
            }

            // startValue to be used for keeping track of hourlyData index
            let startValue = 0;

            // get the data that we'll be iterating over
            let hourlyData = dayData[1];

            // iterate through ours in a day
            for (let y = 0; y < hoursInDay.length; y++) {
                console.log('y iteration: ', y)
                for (let z = startValue; z < hourlyData.length; z++) {
                    // if the hourlyData hour matches hours in day, push to hourly data array
                    if (hourlyData[z][0] === hoursInDay[y]) {
                        console.log('pushing hourly data: ', hourlyData[z])
                        let hData = {
                            hour: hourlyData[z][0],
                            traffic_percentage: hourlyData[z][1],
                        }
                        newDayData.hourlyData.push(hData);
                        // increment startValue to start at next index for next iteration
                        startValue++;
                    } else {
                        let hData = {
                            hour: hoursInDay[y],
                            traffic_percentage: 0,
                        }
                        newDayData.hourlyData.push(hData)
                    }
                    // break the loop
                    break;
                }
            }
            popularTimes.push(newDayData);
        }

        return popularTimes;
    }
}