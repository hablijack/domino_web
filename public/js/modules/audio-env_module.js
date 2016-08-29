/**
  * AudioEnv is a module to insert an audio tag onto a defined position in the DOM-tree.
  */
var AudioEnv = ( function ( cssSelector ) { 
	// represents the HTML element, which should contain the audio container
	var elem = $(cssSelector);

	return {
		// inserts an HTML5 Audio Tag with "autoplay" functionality
		play : function(soundfilePath){
			elem.html("");
			elem.html("<audio src='" + soundfilePath + "' autoplay></audio>");
		},

		// removes all content from the audio container tag to stop playback imideatly
		stop : function(){
			elem.html("");
		}
	};
});
