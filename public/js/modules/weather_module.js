var Weather = (function() {
	// replace YOURAPIKEY for wunderground.com weather api
    var WUNDERGROUND_URL = "https://api.wunderground.com/api/YOURAPIKEY/forecast/lang:DL/q/Germany/Wiesau.json";
    var MASCHINENRING_TODAY_URL = "/maschinenring_weather_today.json";
    var MASCHINENRING_TOMORROW_URL = "/maschinenring_weather_tomorrow.json";

    var maschinenringAjaxRequest = function(day) {
        let url = "";
        if (day == "today") {
            url = MASCHINENRING_TODAY_URL;
        } else {
            url = MASCHINENRING_TOMORROW_URL;
        }
        $.ajax({
            method: "GET",
            url: url
        }).done(function(data) {
            presentResult(data);
        });
    };

    var wundergroundAjaxRequest = function(index) {
        $.ajax({
            method: "GET",
            url: WUNDERGROUND_URL
        }).done(function(data) {
            var forecast = data.forecast.txt_forecast.forecastday;
            TTS.talk('Das Wetter für ' + forecast);
        });
    };

    var presentResult = function(data) {
        let output = "<table class='weatherTable'><tr>" +
            "<th>Uhrzeit</th>" +
            "<th>Temperatur</th>" +
            "<th>Niederschlag</th>" +
            "<th>Wind</th>" +
            "<th>Wolken</th>" +
            "<th>Sonne</th></tr>";
        for (var i = 0, len = data.length; i < len; i++) {
            output += "<tr><td>" + data[i].hour + "</td>";
            output += "<td>" + data[i].temperature + "</td>";
            output += "<td>" + data[i].rainfall + "</td>";
            output += "<td>" + data[i].wind + "</td>";
            output += "<td>" + data[i].clouds + "</td>";
            output += "<td>" + data[i].sun + "</td></tr>";
        }
        Textmessage.show(output, 70000);
    };

    return {
        atTheMoment: function() {
            maschinenringAjaxRequest("today");
            if (moment().locale('de').hours() > 16) {
                wundergroundAjaxRequest(1);
            } else {
                wundergroundAjaxRequest(0);
            }
        },
        tomorrow: function(nightwish) {
            maschinenringAjaxRequest("tomorrow");
            if (nightwish) {
                wundergroundAjaxRequest(3);
            } else {
                wundergroundAjaxRequest(2);
            }
        }
    }
})();
