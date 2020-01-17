var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var authorSchema = new Schema({
	'name' : String,
	'lastName' : String,
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('author', authorSchema);
