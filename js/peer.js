navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
(function() {
	//var firebaseRoot = new Firebase("https://shining-torch-5897.firebaseio.com/");
	//var games = firebaseRoot.child("games");
	window.JeopardyGame = {
		createGame: function(name) {
			this.connection = new DataConnection();
			this.connection.onopen = this._onConnect.bind(this);
			this.connection.onmessage = this._onMessage.bind(this);
		},
		_onConnect: function(e) {
			console.log(e);
		},
		_onMessage: function(msg, uid) {
			console.log(arguments);
		},
		joinGame: function(game) {
			
		},
		writeObject: function(object) {
			
		},
		onReadObject: function(object) {
			
		}
	};
})();