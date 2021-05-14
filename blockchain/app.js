const express = require('express');

//Initialize app instance and define public directory path
const app = express();

//Router
app.get('', (req, res) => {
    res.send('App running');
});

//Running server on port 8888
app.listen(3654, () => {
});