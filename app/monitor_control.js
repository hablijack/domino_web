const exec = require('child_process').exec;

module.exports = function () {

	var executeShell = function(cmd) {
		child = exec(cmd, function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	}

	return {

		turnOn : function(  ) {
			executeShell( "xset dpms force on" );
		},

		turnOff: function () {
			executeShell( "xset dpms force off" );
		}
	}
}();

