const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    birthdate: Date
});

module.exports = mongoose.model('User', UserSchema);
