import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
	neededSeat: 5,
	userid: '584e24befce41a52fc3e75f9',
	selectedSeats: [],

	init() {

	},

	actions: {
		onSubmitBookedSeats: function(selectedSeats) {
			var seatIds = [];
			selectedSeats.forEach((item) => {
				seatIds.push(item._id);
			});

			var putData = {
				userid: this.get('userid'),
				seatids: seatIds
			};
			
			var url = `${config.APP.baseUrl}/api/seats/submit`;
			$.ajax(url, {
				method: 'PUT',
				data: putData
			}).then(() => {
				toastr.success("Submitted successfully!", "Congratulation");
			});
		}
	}
});
