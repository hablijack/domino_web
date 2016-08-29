const fs = require('fs');
const ps = require('pocketsphinx').ps;
const mic = require('mic');
const env = require('node-env-file');

env('.env');

module.exports = function () {

	var foundKeyword = function(io, output) {
		io.emit('keyword', output.hypstr);
		console.log("Found Keyword: " + output.hypstr);
	}

	return {

		init : function( io ) {
			var config = new ps.Decoder.defaultConfig();
			config.setString("-hmm", process.env.MODEL_DIR);
			config.setString("-dict", process.env.DICT_TO_USE);
			config.setString("-kws", process.env.KEYPHRASE_FILE);
			config.setString("-logfn", '/dev/null');
			var decoder = new ps.Decoder(config);
			decoder.startUtt();
			//var micInstance = mic({ 'rate' : '16000', 'debug': true, 'device' : 'plughw:Device' });
			var micInstance = mic({ 'rate' : '16000', 'debug': true });
			var micFileStream = micInstance.getAudioStream();

			var processMic = function() {
			    var chunkCounter = 0;
			    return (function(chunk) {
				    var output = null;
				    
				    decoder.processRaw(chunk, false, false);
				    output = decoder.hyp();
				    
				    if(output != null) {
					foundKeyword(io, output);
					decoder.endUtt();
					decoder.startUtt();
				    }
				});
			}

			micInstance.start();
			micFileStream.on('data', processMic());
			micFileStream.on('processExitComplete', function() {
				console.log("file stream completed");
			});
		}
	}
}();

