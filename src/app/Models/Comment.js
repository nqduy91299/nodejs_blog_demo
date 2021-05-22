const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const Comment = new Schema({
    comment: {type: String, required: true},
    createdBy: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
}) ;

Comment.plugin(mongoose_delete , {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('Comment', Comment);