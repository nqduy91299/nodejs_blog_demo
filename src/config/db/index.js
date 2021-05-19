const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/demo_blog_dev', {
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