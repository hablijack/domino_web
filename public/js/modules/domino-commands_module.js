'use strict';

var DominoCommands = ( function() {

	var commands = [
		{
			phrase: ['HALLO'],
			action : function(){
				TTS.talk('Sir, wie kann ich helfen?');
				Textmessage.show("Hallo :)", 4500);
			}
		},
		{
			phrase: ['WIE SPÄT', 'UHRZEIT'],
			action : function(){
				TTS.talk('Es ist jetzt ' + moment().locale("de").format("H [Uhr und] m [Minuten]"));
				Textmessage.show( moment().locale("de").format("H[:]mm"), 4500 );
			}
		},
		{
			phrase: ['WETTER MORGEN'],
			action : function(){
				Weather.tomorrow(false);
			}
		},
		{
			phrase: ['WETTER DRAUSSEN'],
			action : function(){
				Weather.atTheMoment();
			}
		},
		{
			phrase: ['MONITOR EINSCHALTEN', 'BILDSCHIRM EINSCHALTEN'],
			action : function(){
				TTS.talk('Natürlich Sir, aktiviere monitor');
				MonitorControl.turnOn();
			}
		},
		{
			phrase: ['MONITOR AUSSCHALTEN', 'BILDSCHIRM AUSSCHALTEN'],
			action : function(){
				TTS.talk('Natürlich Sir, deaktiviere monitor');
				MonitorControl.turnOff();
			}
		},
		{
			phrase: [ 'NACHRICHTEN' ],
			action : function(){
				TTS.talk('Einen Moment Sir, ich zapfe die Datenbanken an.');
				Tagesschau.show();
			}
		},
	];


	return {
		checkKeyword: function(command) {
			console.log(command.trim() === 'DOMINO');
			return (command.trim() === 'DOMINO');
		},
		execute: function(command) {
			console.log(command);
			for(var i = 0; i < commands.length; i++) {
				if (commands[i].phrase.indexOf(command.trim()) > -1) {
					commands[i].action();
				}
			}
		}
	}
})();
