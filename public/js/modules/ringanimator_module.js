/**
 * RingAnimator is a module to be called in a loop. 
 * It animates the "jarvis" rings to display the wowing UI Effect
 */
var RingAnimator = ( function(cssSelector){

	// represents the dom element to be animated
	var elem = $(cssSelector);

	return {
		// animate the given css element and rotate ist infinite
		animate: function(time, deg){
			var resetDeg = (deg=='-360deg') ? '360deg' : '-360deg';
			elem.css({ rotate: resetDeg });
			elem.transition({ rotate: deg }, time, 'linear', function(){});
		}
	};
});

