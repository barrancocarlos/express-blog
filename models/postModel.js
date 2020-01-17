var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'title' : String,
	'content' : String,
	'createdAt' : Date,
	'updatedAt' : Date,
	'author' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'author'
	}
});

module.exports = mongoose.model('post', postSchema);
