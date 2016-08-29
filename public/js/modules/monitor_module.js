var MonitorControl = ( function() {

	var doPostRequest = function(state) {
		$.post( "/switchMonitor", { "state": state } );
	};

	return {
		turnOn: function() {
			doPostRequest("on");
		},

		turnOff: function() {
			doPostRequest("off");
		}
	};
})();

