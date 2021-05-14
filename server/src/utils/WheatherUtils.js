const wheatherApi = require('../apis/wheather');


const fetchWheather = async (lat, lon, units = 'm') => {
    try{
        const res = await wheatherApi.get('/current', {
            params: { 
                query: `${lat},${lon}`,
                units
            }
        });
        return res.data.current;
    }
    catch(e){
        console.log(`Unable to connect with Wheather services`);
    }
}

module.exports = {
    fetchWheather
}