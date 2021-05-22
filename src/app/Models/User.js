const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const User = new Schema({
    name: {type: String, required: true},
    password: {type: String},
    username: {type: String},
    avatar: {type: String},
    /*
    * @role user:
    * 0 => admin
    * 1 => client
    */
    role: {type: Number},
}, {
    timestamps: true
}) ;

User.plugin(mongoose_delete , {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('User', User);