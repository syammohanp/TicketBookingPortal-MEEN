const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require("../models/user");

const SeatSchema = new Schema({
    name: Number, //also id
    isbooked: Boolean,
    col: Number,
    row: Number,
    bookedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Seat', SeatSchema);
