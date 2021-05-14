const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {fetchCoordinates} = require('./utils/GeocodeUtils');
const {fetchWheather} = require('./utils/WheatherUtils');

//Initialize app instance and define public directory path
const app = express();
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');

//Setup static dir to serve
app.use(express.static(publicPath));
app.use(
    express.urlencoded({
      extended: true
    })
  );

//Setup handlebar view engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Router
app.get('', (req, res) => {
    res.render('index');
});

app.get('/temperature', (req, res) => {
    res.render("wheather", {
        title: "Temperature"
    });
});

app.get('/humidity', (req, res) => {
    res.render("wheather", {
        title: "Humidity"
    });
});

app.post('/wheather-focast', async (req, res) => {
    if(!req.body.location)
        return res.send({
            code: 400,
            payload: "Please enter a address"
        });

    const coordinates = await fetchCoordinates(req.body.location);
    const [lon, lat] = coordinates ? coordinates : [];
    if(!lat || !lon) 
        return res.send({
            code: 400,
            payload: "Address is invalid"
        });

    const data = await fetchWheather(lat, lon);
    if(!data)
        return res.send({
            code: 400,
            payload: "Can not get wheather at the moment. Please try later"
        });

    res.send({
        code: 200,
        payload: data
    });
});

app.get('*', (req, res) => {
    res.render("404");
});

//Running server on port 8888
app.listen(8080, () => {
    console.log("Server is runing...")
});