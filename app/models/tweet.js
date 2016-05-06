var mongoose = require('mongoose');

module.exports = mongoose.model('Tweet', {
	source : {type : String},
	tweet  : {type : String}
	// hashtag : {type : []},
	// twitterHandle : {type : []}
});