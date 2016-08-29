var SocketModule = ( function() {

	const SOCKET_URL = 'https://localhost:3000';
	var socket = null;
	var hotmode = false;

	return {

		init : function() {
			socket = io.connect( SOCKET_URL );

			socket.on('keyword', function(command) {
				if(hotmode) {
					Domino.executeCommand(command);
					hotmode = false;
				}

				if( DominoCommands.checkKeyword(command) ) {
					hotmode = true;
					Domino.keywordFound();
				}
				
			});
		}
	}
})();

