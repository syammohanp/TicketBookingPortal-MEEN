import Ember from 'ember';

export default Ember.Object.extend({
	_id: 0,
	id: 0,
	isbooked: false,
	col: 0,
	row: 0,


	//Once instance is created, Init is invoked
	init() {

	},

	book() {
		if (this.get('isbooked') === false) {
			this.set('isbooked', true);
		}
	},
	unbook() {
		if (this.get('isbooked')) {
			this.set('isbooked', false);
		}
	},

	setState(state) {
		this.set('isbooked', state);
	},

	getState() {
		return this.get('isbooked');
	}

});