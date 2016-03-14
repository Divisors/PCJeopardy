navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
(function() {
	//var firebaseRoot = new Firebase("https://shining-torch-5897.firebaseio.com/");
	//var games = firebaseRoot.child("games");
	window.JeopardyGame = {
		peerConnectionConfig: {
			'iceServers': [
				{'url': 'stun:stun.services.mozilla.com'},
				{'url': 'stun:stun.l.google.com:19302'}
			]
		},
		_gotIceCandidate: function(event) {
			if(event.candidate != null) {
				console.log(JSON.stringify({'ice': event.candidate}));
			}
		},
		_gotRemoteStream: function(stream) {
			console.log('stream: ', stream);
		},
		_onSDP: function(sdp) {
			console.log('sdp',sdp);
		},
		_gotDescription: function(description) {
			console.log('description', description);
			this.peerConnection.setLocalDescription(description, function () {
				console.log(JSON.stringify({'sdp': description}));
			}, function() {console.log('set description error')});
		},
		_createOfferError: function(descr) {
			console.error('offer error', descr);
		},
		createGame: function(name) {
			
		},
		joinGame: function(game) {
			
		},
		_start: function(isCaller) {
			this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
			this.peerConnection.onicecandidate = this._gotIceCandidate.bind(this);
			this.peerConnection.onaddstream = this._gotRemoteStream.bind(this);
			if(isCaller) {
				this.peerConnection.createOffer(this._gotDescription.bind(this), this._createOfferError.bind(this));
			}
		},
		writeObject: function(object) {
			
		},
		onReadObject: function(object) {
			
		}
	};
})();