/*TOMTOM JSON ... aber spezifisch für ne route :(
https://api-internal.tomtom.com/lbs/services/trafficIcons/3/s3/49.60003042758961,11.515731811523438,49.990525382419904,12.834091186523438/11/-1/json?key=w7wd5devk7b9ejxfpx5jct48&projection=EPSG4326&language=de&expandCluster=false


ADAC JSON Schnittstelle*/

var Traffic = ( function() {

	var rss2jsonUrl = 'https://rss2json.com/api.json?rss_url=';

	var adac50kmRadiusRssUrl = 'http://routenplaner.adac.de/util/RSSFeed.aspx?type=VerkehrsInfo&param=AAPwGU2.4GL5yGm6s1i8sVVYzALKBzL571cIsH58H51JsHaKsHeIy5xwxViI7He97qPzzo93Uoi345ZI0EPFGfNpCAnwAAEpGe56H156H156HA__';

	var tomtomWorkJourneyChristophJsonUrl = 'https://api-internal.tomtom.com/lbs/services/trafficIcons/3/s3/49.60003042758961,11.515731811523438,49.990525382419904,12.834091186523438/11/-1/json?key=w7wd5devk7b9ejxfpx5jct48&projection=EPSG4326&language=de&expandCluster=false';

	var tomtomWorkJourneyBarbaraJsonUrl = '';

	var buildRSSTrafficTable = function(incidents) {
		var tableString = "<table>";
		incidents.forEach(function(item) {
			tableString += "<tr><td>" + item.title + "</td><td>" + item.content + "</td></tr>";
		});
		tableString += "</table>";
		return tableString;
	}

	return {
		adac50kmRadiusLookup : function() {
			$.getJSON( rss2jsonUrl + encodeURIComponent(adac50kmRadiusRssUrl), function(data) {
				TTS.talk('Sir, mir liegen momentan ' + data.items.length + ' Verkehrsmeldungen vor.');
				Textmessage.show( buildRSSTrafficTable( data.items ), 20000);
			});
		},
		tomtomWorkJourneyChristoph : function() {
			$.getJSON( tomtomWorkJourneyChristophJsonUrl, function(data) {
				console.log(data);
			});
		},
		tomtomWorkJourneyBarbara : function() {
			$.getJSON( tomtomWorkJourneyBarbaraJsonUrl, function(data) {
				console.log(data);
			});
		}
	}
})();

