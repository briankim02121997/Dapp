const yargs = require('yargs');
const wheatherUtil = require('../utils/WheatherUtils');
const geoCodeUtil = require('../utils/GeocodeUtils');


yargs.version('1.0.0');

//Fetching wheather status in provided location
yargs.command({
    command: 'fetch',
    describe: 'Fetching wheather',
    builder: {
        location: {
            describe: 'Location name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: async (argv) => {
        const [lon, lat] = await geoCodeUtil.fetchCoordinates(argv.location);
        const forecastData = await wheatherUtil.fetchWheather(lat, lon);
        console.log(`It's currently ${forecastData.temperature} degree.There is a ${forecastData.feelslike}% of rains`)
    }
});

yargs.parse();