const axios = require('axios');

const TOKEN = "pk.eyJ1IjoibmluaGtpbSIsImEiOiJja29hYWI1a3owMGF1MnZva2MxamN3ank0In0.LpaAtn1BeL6eKsDjGecQlw";
const BASE_URL = "https://api.mapbox.com";

const geocoding = axios.create({
    baseURL: `${BASE_URL}/geocoding/v5/mapbox.places`,
    params: {
        access_token: TOKEN
    }
});

module.exports = {
    geocoding
};