var Tagesschau = ( function() {
	return {
		show : function() {
			$.get( '/newsVideoUrl' , function(data) {
				$('#videoContainer video').attr('src', data);
				$('#videoContainer video').on('ended', Tagesschau.hide);
				$('#videoContainer').show();
			});
		},
		
		hide : function() {
			$('#videoContainer').hide();
		}
	}
})();

