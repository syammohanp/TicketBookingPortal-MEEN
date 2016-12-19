const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
	mailling: Boolean,
	sms: Boolean
});


module.exports = mongoose.model('Setting', SettingSchema);
