var mongoose = require('mongoose');

var Paragraph = require('../models/Paragraph');

var Tag = require('../models/Tag');

function setUpConnection() {
    mongoose.connect(`mongodb://localhost/reactText`, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
}

function listParagraph() {
    return Paragraph.find();
}

function listTag() {
    return Tag.find();
}

function createParagraph(data) {
    const paragraph = new Paragraph({
        value: data.value
    });
    return paragraph.save();
}

function createTag(data) {
    const tag = new Tag({
        value: data.value
    });
    return tag.save();
}

function deleteTag(id) {
    return Tag.findById(id).remove();
}

function initDBWithText(){
    listParagraph().then(function(data){
        if(data.length == 0){
            var textToInitBd = { value:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum ut risus blandit interdum. Pellentesque et felis eu ligula accumsan molestie eget non ante. Integer vel rhoncus sem. Mauris sapien lorem, vehicula a facilisis ut, rutrum ac velit. In ac est eu magna hendrerit maximus. Morbi ultricies rutrum est vel posuere. Etiam nec dui lacinia, bibendum augue at, tempor velit. Mauris porttitor ligula id nisl faucibus elementum. Donec ut interdum augue. Nulla convallis tortor a sem finibus, sed varius turpis ultrices. Etiam nibh erat, finibus at porta nec, ullamcorper in libero. Nam pretium, odio non fringilla iaculis, urna leo pretium mauris, id tincidunt tortor lectus nec purus. Pellentesque lacus felis, molestie ut ex at, placerat varius est. Cras id massa mollis, dictum nisi non, auctor dolor. Quisque dignissim tempor nunc, a semper massa sollicitudin vel. Vivamus varius, tellus vitae porttitor placerat, leo augue pretium purus, sit amet elementum est neque eget leo. Curabitur sit amet rhoncus turpis. Ut vel gravida enim. Integer imperdiet congue commodo. Vivamus at justo et massa faucibus molestie vitae id metus. Nunc feugiat vitae leo sit amet euismod. Aliquam erat volutpat. Sed scelerisque ex eu nunc lobortis porta. Pellentesque accumsan vitae lectus vitae sodales. Suspendisse vitae convallis eros. Quisque gravida tempor justo, ut consequat metus tincidunt in. Etiam posuere convallis risus, sit amet scelerisque magna. Nulla vitae scelerisque felis. Morbi euismod placerat massa, id porttitor urna rutrum vel.'};
            for(var i = 0; i < 3; i++){
                createParagraph(textToInitBd);
            }
        }else{
            console.log("Data base init!");
        }
    });
}
module.exports = {
    setUpConnection: setUpConnection,
    initDBWithText: initDBWithText,
    listParagraph: listParagraph,
    listTag: listTag,
    createTag: createTag,
    deleteTag: deleteTag
}