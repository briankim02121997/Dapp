const {geocoding} = require('../apis/mapbox');


const fetchCoordinates = async (locationName) => {
    try{
        const res = await geocoding.get(`${locationName}.json`, {
            params: {
                limit: 1
            }
        });
        return res.data.features[0].center;
    }
    catch(e){
        console.log(`Unable to connect with MapBox services`);
    }
}

module.exports = {
    fetchCoordinates
}