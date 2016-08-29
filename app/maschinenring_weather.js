const request = require('urllib-sync').request;

module.exports = function() {

    const WEATHER_URL = "https://www.maschinenring.de/index.php?eID=semrwServiceHandler&params[func]=getWeatherByLatLng&args%5Blatlng%5D%5Blat%5D=49.9050667&args%5Blatlng%5D%5Blng%5D=12.176272700000027&args%5Baddress%5D=95676+Wiesau+(DE)";

    var getJSON = function() {
        let res = request(WEATHER_URL, {
            'timeout': 12000
        }).data;
        return JSON.parse(res).ajaxResult;
    };

    var formatDate = function(date) {
        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        let day = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        return day + "." + month + ".";
    }

    var getCurrentDateShort = function() {
        let date = new Date();
        return formatDate(date);
    };

    var getTomorrowDateShort = function() {
        let date = new Date();
        var newDate = new Date(date.setTime(date.getTime() + 1 * 86400000));
        return formatDate(newDate);
    };

    var getJSONWeatherInformationRow = function(hourlyData) {
        let hour = hourlyData.timestamp.hour;
        let temperature = hourlyData.temperature;
        let rainfall = hourlyData.rainfall;
        let wind = hourlyData.wind;
        let misc = hourlyData.misc;
        var weatherRow = {
            "hour": hour + " Uhr",
            "temperature": temperature.ground + "°C (gefühlt " + temperature.feeling + "°C)",
            "rainfall": rainfall.risk + "% (Menge " + rainfall.ammount + "L)",
            "wind": wind.speed + "KMh",
            "clouds": misc.cloudiness + "%",
            "sun": misc.sunshine + "%"
        };
        return weatherRow;
    };

    var getCompleteWeatherInformation = function(dateString) {
        let jsonWeather = getJSON().hourly;
        let completeWeatherInfo = [];
        for (var i = 0, len = jsonWeather.length; i < len; i++) {
            let date = jsonWeather[i].timestamp.date;
            if (dateString === date) {
                completeWeatherInfo.push(getJSONWeatherInformationRow(jsonWeather[i]));
            }
        }
        return completeWeatherInfo;
    }

    return {
        today: function() {
            return getCompleteWeatherInformation(getCurrentDateShort());
        },
        tomorrow: function() {
            return getCompleteWeatherInformation(getTomorrowDateShort())
        }
    }
}();
