module.exports = function(remote){
	this.increase = function(obj){ return remote.dispatch('increase') }
	this.decrease = function(obj){ return remote.dispatch('decrease') }
}