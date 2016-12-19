import Ember from 'ember';
import Seat from '../models/seat';
import config from '../config/environment';

export default Ember.Component.extend({
    seats: [],
    bookedSeatCount: 0,

    init() {

        this._super(...arguments);

        $.getJSON(`${config.APP.baseUrl}/api/seats`).then(data => {
            let seatArray = [];
            data.forEach((item) => {
                let seat = Seat.create({
                    _id: item._id,
                    id: item.name,
                    isbooked: item.isbooked,
                    col: item.col,
                    row: item.row,
                    bookedby: item.bookedby
                });
                seatArray.push(seat);
            });
            this.set('seats', seatArray);
        });
    },

    actions: {
        onBooking(seat) {

            if (seat.bookedby) {
                toastr.error('This seat is blocked...You can not choose this.', 'Booking Confirmed');
                return;
            }

            let bookedSeatCount = this.get('bookedSeatCount');
            let needCount = +this.get('need');

            if (needCount === 0) {
                toastr.error('Please enter number of required seats.', 'Number of seat is missing');
                return;
            } else if (bookedSeatCount >= needCount) {
                toastr.success('You have completed your need seats', 'Completed');
                return;
            }

            //The number of avaible seats to the right
            let rightAvailableSeatCount = (config.APP.numberOfCol - seat.col);

            //The remaining seats need to be booked
            let remainingSeatCount = needCount - bookedSeatCount;

            if (needCount <= rightAvailableSeatCount && bookedSeatCount === 0) {
                for (let i = (seat.id - 1); i < (seat.id - 1) + needCount; i++) {
                    this.get('seats')[i].setState(!this.get('seats')[i].getState());
                }
            } else {
                for (let i = (seat.id - 1); i < (seat.id - 1) + rightAvailableSeatCount && i < (seat.id - 1) + remainingSeatCount; i++) {
                    this.get('seats')[i].setState(!this.get('seats')[i].getState());
                }
            }
            this.set('bookedSeatCount', this.getNumberOfBookedSeat());
        },

        onReset() {
            this.get('seats').forEach((s) => {
                if (s.getState()) {
                    s.setState(false);
                }
            });
            this.set('bookedSeatCount', 0);
            this.set('need', 0);
        },

        onSubmit() {
            let bookedSeats = this.get('seats').filter((item) => {
                return item.getState() === true;
            });
            this.sendAction('action', bookedSeats);
        }
    },

    //Count the number of booked seat
    getNumberOfBookedSeat() {
        let result = 0;
        this.get('seats').forEach((s) => {
            if (s.getState()) {
                result++;
            }
        });
        return result;
    }
});
