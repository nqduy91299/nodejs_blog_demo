const Course = require('../Models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')

class SiteController{

    // [GET] /
    index(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
       Course.find({})
            .then((courses) => {
                res.render('home', {courses: multipleMongooseToObject(courses), user})
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res){
        res.render('search')
    }
}

module.exports = new SiteController;