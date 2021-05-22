const mongoose = require('mongoose');
const CONNECT_STRING = 'mongodb+srv://dbAdmin:dbAdmin123123%21@%23%21@%23@advance-web.b5qbo.mongodb.net/Blog?retryWrites=true&w=majority';

async function connect(){
    try {
        await mongoose.connect(CONNECT_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect db successful!')
    } catch (error) {
        console.log('connect db failure!')
    }
}

module.exports = {connect};