/**
  * Marytts is a module to connect to a mary-text-to-speech server.
  * It provides methods to talk to the server and handle response.
  * The response is dumped in an audio file html5 tag and added to the audio-container.
  */
var TTS = ( function ( ) { 

	// The marytts-host-address. Change this to fit your application
	//var MARYTTS_HOST = 'http://mary.dfki.de:59125';
	var MARYTTS_HOST = 'http://localhost:59125';

	// The marytts params, which control the settings and voice.
	// Change this to fit your needs. This are default values.
	// Feeld free to change language, speaker and volume, etc. ...
	var PARAMS = {
		'INPUT_TYPE' : 'TEXT',
		'OUTPUT_TYPE' : 'AUDIO',
		'effect_Volume_selected' : 'on',
		'effect_Volume_parameters' : 'amount:1.5;',
		'effect_Volume_default' : 'Default',
		'effect_Volume_help' : 'Help',
		'effect_TractScaler_parameters' : 'amount:1.5;',
		'effect_TractScaler_default' : 'Default',
		'effect_TractScaler_help' : 'Help',
		'effect_F0Scale_parameters' : 'f0Scale:2.0;',
		'effect_F0Scale_default' : 'Default',
		'effect_F0Scale_help' : 'Help',
		'effect_F0Add_parameters' : 'f0Add:50.0;',
		'effect_F0Add_default' : 'Default',
		'effect_F0Add_help' : 'Help',
		'effect_Rate_parameters' : 'durScale:1.5;',
		'effect_Rate_default' : 'Default',
		'effect_Rate_help' : 'Help',
		'effect_Robot_parameters' : 'amount:100.0;',
		'effect_Robot_default' : 'Default',
		'effect_Robot_help' : 'Help',
		'effect_Whisper_parameters' : 'amount:100.0;',
		'effect_Whisper_default' : 'Default',
		'effect_Whisper_help' : 'Help',
		'effect_Stadium_parameters' : 'amount:100.0',
		'effect_Stadium_default' : 'Default',
		'effect_Stadium_help' : 'Help',
		'effect_Chorus_parameters' : 'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30',
		'effect_Chorus_default' : 'Default',
		'effect_Chorus_help' : 'Help',
		'effect_FIRFilter_parameters' : 'type:3;fc1:500.0;fc2:2000.0',
		'effect_FIRFilter_default' : 'Default',
		'effect_FIRFilter_help' : 'Help',
		'effect_JetPilot_default' : 'Default',
		'effect_JetPilot_help' : 'Help',
		'VOICE_SELECTIONS' : 'bits3 de male unitselection general',
		'AUDIO_OUT' : 'WAVE_FILE',
		'LOCALE' : 'de',
		'VOICE' : 'bits3',
		'AUDIO' : 'WAVE_FILE'
	};

	var getBaseUrl = function() {
		return MARYTTS_HOST + '/process' + '?' + $.param(PARAMS);
	};
	
	var getInputParam = function( text ) {
		return '&INPUT_TEXT=' + encodeURIComponent(text);
	};
	
	var getRandText = function(talkArr) {
		var randIndex = Math.floor((Math.random() * talkArr.length) + 1) -1;
		return talkArr[randIndex];
	};
	
	return {
		talk : function ( input ){
			var text = input;
			if($.isArray(text)){
				text = getRandText(input);
			}
			var audioSrc = getBaseUrl() + getInputParam( text );
			$('#voice-container').html( 
				$('<audio id="speechAudioElement" class="audio" src="' + audioSrc + '" autoplay></audio>') 
			);

			$('#speechAudioElement').on('ended', function() {
				alert('ended');
			});
		}
	};
})();


/**
  * Marytts is a module to connect to a mary-text-to-speech server.
  * It provides methods to talk to the server and handle response.
  * The response is dumped in an audio file html5 tag and added to the audio-container.
  
var TTS = ( function ( ) { 

	// The marytts-host-address. Change this to fit your application
	var MARYTTS_HOST = 'https://code.responsivevoice.org';

	// The marytts params, which control the settings and voice.
	// Change this to fit your needs. This are default values.
	// Feeld free to change language, speaker and volume, etc. ...
	var PARAMS = {
		'tl' : 'de',
		'sv' : '',
		'vn' : '',
		'pitch' : '0.5',
		'rate'  : '0.5',
		'vol' : '1'
	};

	var getBaseUrl = function() {
		return MARYTTS_HOST + '/getvoice.php' + '?' + $.param(PARAMS);
	};
	
	var getInputParam = function( text ) {
		return '&t=' + encodeURIComponent(text);
	};
	
	var getRandText = function(talkArr) {
		var randIndex = Math.floor((Math.random() * talkArr.length) + 1) -1;
		return talkArr[randIndex];
	};
	
	return {
		talk : function ( input ){
			var text = input;
			if($.isArray(text)){
				text = getRandText(input);
			}
			var audioSrc = getBaseUrl() + getInputParam( text );
			$('#voice-container').html( 
				$('<audio id="speechAudioElement" class="audio" src="' + audioSrc + '" autoplay></audio>') 
			);

			$('#speechAudioElement').on('ended', function() {
				alert('ended');
			});
		}
	};
})();


var TTS = ( function ( ) { 

	var getRandText = function(talkArr) {
		var randIndex = Math.floor((Math.random() * talkArr.length) + 1) -1;
		return talkArr[randIndex];
	};

	return {
		endCallback : function () {
			console.log("The text has been finished.");
		},
		startCallback : function () {
			console.log("The text has been started.");
		},
		talk : function ( input ){
			var text = input;
			if($.isArray(input)){
				text = getRandText(input);
			}
			responsiveVoice.fallbackMode = true;
			responsiveVoice.speak(text);
		}
	};
})();*/
