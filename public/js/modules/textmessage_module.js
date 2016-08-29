var Textmessage = ( function() {
	return {
		show : function(msg, duration) {
			$("#messageContainer").html(msg);
			$("#messageContainer").fadeIn("slow");
			setTimeout(function() {
				$("#messageContainer").fadeOut("slow");
			}, duration);
		}
	}
})();
