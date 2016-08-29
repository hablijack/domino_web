const request = require('urllib-sync').request;
const cheerio = require("cheerio");

module.exports = function () {
	var tagesschauBaseDomain = 'http://www.tagesschau.de';
	var tagesschauURL = tagesschauBaseDomain + '/100sekunden/index.html';

	return {

		getVideoURL : function(  ) {
			var data = request(tagesschauURL, {'timeout': 12000 }).data;

			var $ = cheerio.load(data);
			var urlJSON = $("iframe").attr("data-ctrl-iframe").replace(/'/g, '"');
			urlJSON = urlJSON.replace(/, ratio:1.77/g, '');
			urlJSON = urlJSON.replace(/,  ratio:1.77/g, '');
			var videoURL = JSON.parse(urlJSON).action.default.src;

			var videoData = request( tagesschauBaseDomain + videoURL, {'timeout': 12000 } ).data;
		
			var $ = cheerio.load(videoData);
			var returnURL = $("meta[name='twitter:player:stream']").attr("content");
			return returnURL.replace('webm', 'webxl');
		}
	}
}();

