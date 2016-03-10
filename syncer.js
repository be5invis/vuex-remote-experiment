var Syncer = function(target){
	this.pendingPacket = null;
	this.target = target;
	this.receivers = {};
	this._n = 0;
}
Syncer.prototype.attach = function(receiver){
	this._n += 1;
	this.receivers[this._n] = receiver;
	return this._n
}
Syncer.prototype.detach = function(id){
	this.receivers[id] = null;
}
Object.defineProperty(Syncer.prototype, 'state', {
	get: function(){
		return this.target.state
	}
});
Syncer.prototype.dispatch = function(){
	return this.target.dispatch.apply(this.target, arguments)
}
Syncer.prototype.registerSync = function(){
	if(!this.pendingPacket) {
		var t = this;
		var receivers = t.receivers;
		this.pendingPacket = setTimeout(function(){
			for(var w in receivers) if(receivers[w])
				receivers[w].send('sync');
			t.pendingPacket = null;
		}, 0);
	}
}

module.exports = Syncer;