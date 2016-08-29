const path = require('path');
const pocketsphinx = require('./stt.js');
const monitorControl = require('./monitor_control.js');
const newsFetcher = require('./news_fetcher.js');
const weather = require('./maschinenring_weather.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });

    app.get('/favicon.ico', function(req, res) {
        res.sendFile(path.resolve('public/images/favicon.ico'));
    });

    app.get('/maschinenring_weather_today.json', function(req, res) {
        res.send(weather.today());
    });

    app.get('/maschinenring_weather_tomorrow.json', function(req, res) {
        res.send(weather.tomorrow());
    });

    app.post('/switchMonitor', function(req, res) {
        var state = req.body.state;
        if (state == "on") {
            monitorControl.turnOn();
        } else {
            monitorControl.turnOff();
        }
    });

    app.get('/newsVideoUrl', function(req, res) {
        res.send(newsFetcher.getVideoURL());
    });
};
