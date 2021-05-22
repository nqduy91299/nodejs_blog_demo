const Course = require('../Models/Course')
const Blog = require('../Models/Blog')
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose')

class CourseController{
    
    // [GET] /me/store/courses
    storedCourses(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');

        Promise.all([Course.find({createdBy: user?._id}), Course.countDocumentsDeleted({createdBy: user?._id})])
        .then(([courses, countDeletedCourses]) => {
            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses), 
                countDeletedCourses, 
                user, 
                notify: notify[0]
            })
        })
        .catch(next);
        
    }

    // [GET] /me/bin/courses
    binCourses(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');
        
        Course.findDeleted({createdBy: user?._id})
        .then((course) => {
            res.render('me/bin-courses', {
                courses: multipleMongooseToObject(course), 
                user, 
                notify: notify[0]})
        })
        .catch(next);
    }


    storedBlogs(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');
        
        Promise.all([Blog.find({createdBy: user?._id}), Blog.countDocumentsDeleted({createdBy: user?._id})])
        .then(([blogs, countDeletedBlogs]) => {
            res.render('me/stored-blogs', {
                blogs: multipleMongooseToObject(blogs), 
                countDeletedBlogs, 
                user, 
                notify: notify[0]
            })
        })
        .catch(next);
    }

     // [GET] /me/bin/blogs
     binBlogs(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');
        
        Blog.findDeleted({createdBy: user?._id})
        .then((blogs) => {
            res.render('me/bin-blogs', {
                blogs: multipleMongooseToObject(blogs), 
                user, 
                notify: notify[0]})
        })
        .catch(next);
    }


   
}

module.exports = new CourseController;