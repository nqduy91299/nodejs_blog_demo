const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Blog = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String},
    comment: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    slug: {type:String, slug: 'title', unique: true},
    createdBy: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
}) ;

mongoose.plugin(slug);
Blog.plugin(mongoose_delete , {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('Blog', Blog);