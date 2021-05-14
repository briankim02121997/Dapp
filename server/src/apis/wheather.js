const axios = require('axios');

const API_KEY = "c625dab746e5b5b168f7da5e7e4266f3";

module.exports = axios.create({
    baseURL: 'http://api.weatherstack.com',
    params: {
        access_key: API_KEY
    }
});