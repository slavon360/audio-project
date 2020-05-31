const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
	title: String,
	artistsIds: [String],
	album: String,
	year: String,
	genre: String,
	rate: Number,
	fileName: String,
	picture: String
});

module.exports = mongoose.model('Track', trackSchema);
