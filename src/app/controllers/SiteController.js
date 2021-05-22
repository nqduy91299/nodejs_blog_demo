const {multipleMongooseToObject} = require('../../util/mongoose');
const Blog = require('../Models/Blog');

class SiteController{

    // [GET] /
    index(req, res, next){
        const notify = req.flash('notify');

        Blog.find({}).populate('createdBy', '-password').select(["-__v"])
            .then((blogs => {
                return res.render('blog', {
                    blogs: multipleMongooseToObject(blogs),
                    user: req.session?.user,
                    notify: notify[0]
                })
            })) 
            .catch(next)
    }

    // [GET] /search
    search(req, res){
        res.render('search')
    }
}

module.exports = new SiteController;