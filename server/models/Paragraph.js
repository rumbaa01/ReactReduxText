var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ParagraphSchema = new Schema({
    value: {type: String}
});

var Paragraph = mongoose.model('Paragraph', ParagraphSchema);

module.exports = Paragraph;