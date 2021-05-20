const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String},
    videoId: {type: String, required: true},
    level: {type: String},
    slug: {type:String, slug: 'name', unique: true},
    createdBy: {type: mongoose.Types.ObjectId, required: true}
}, {
    timestamps: true
}) ;

mongoose.plugin(slug);
Course.plugin(mongoose_delete , {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('Course', Course)