var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

var state = {
	count: 0
}

var mutations = {
	increase : function(state){
		state.count += 1
	},
	decrease : function(state){
		state.count -= 1
	}
}

module.exports = function(syncer){
	var remotize = {
		onMutation: function(mutation, state){
			var receivers = syncer.receivers;
			syncer.registerSync()
		}
	}
	var st = new Vuex.Store({
		state: state,
		mutations: mutations,
		middlewares: [remotize]
	});
	syncer.target = st;
	return st;
}