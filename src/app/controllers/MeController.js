const Course = require('../Models/Course')
const Blog = require('../Models/Blog')
const User = require('../Models/User')
const { multipleMongooseToObject} = require('../../util/mongoose');
const { validationResult } = require('express-validator');

const bcrypt = require("bcrypt")

class CourseController{

    // [GET] /me
    info(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');
        return res.render('me/info', {
            user,
            notify: notify[0]
        })
    }

    //[PUT] /me
    changeInfo(req, res, next){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const user = req.session?.user;
            let obj = req.body;
            if(obj?.avatar){
                delete obj.avatar
            }
            if(req.file != undefined){
                obj.avatar = req.file.filename
            }
            User.findOneAndUpdate({
                    _id: user._id
                }, 
                    obj, 
                { 
                    returnOriginal: false 
                })
                .then(newU => {
                    if(newU){
                        const notify = {isSuccess: true, msg: "Thay đổi thông tin cá nhân thành công"}
                        req.session.user = newU;
                        req.flash('notify', notify);
                        return res.redirect('back');
                    }else{
                        const notify = {isSuccess: false, msg: 'Thay đổi thông tin cá nhân thất bại'}
                        req.flash('notify', notify)
                        return res.redirect('/');
                    }
                })
                .catch(next)
        }else{
            const notify = {isSuccess: false, msg: resultValidation?.errors[0].msg}
            req.flash('notify', notify);
            return res.redirect('/me');
        }
    }

    // [GET] /me/change-password
    changePasswordShow(req, res, next){
        const user = req.session?.user;
        const notify = req.flash('notify');
        return res.render('me/change-password', {
            user,
            notify: notify[0]
        })
    }

    // [PUT] /me/change-password
    changePassword(req, res, next){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const user = req.session?.user;
            let obj = req.body;
            obj.password = bcrypt.hashSync(obj.password, 10)
            User.findOneAndUpdate({_id: user._id}, {password: obj.password})
            .then(() => {
                const notify = {isSuccess: true, msg: "Thay đổi thông tin cá nhân thành công"}
                req.flash('notify', notify);
                return res.redirect('/me');
            })
            .catch(next)

        }else{
            const notify = {isSuccess: false, msg: resultValidation?.errors[0].msg}
            req.flash('notify', notify);
            return res.redirect('/me/change-password');
        }
    }
    
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