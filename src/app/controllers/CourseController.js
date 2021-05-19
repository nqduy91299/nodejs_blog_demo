const Course = require('../Models/Course')
const {mongooseToObject} = require('../../util/mongoose')

class CourseController{

    
    // [GET] /courses/:slug
    show(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
        Course.findOne({slug: req.params.slug})
        .then((course) => {
            res.render('courses/show', {course: mongooseToObject(course), user})
        })
        .catch(next);
    }
    
    //[GET] /courses/create
    create(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
        res.render('courses/create', {user});
    }

    //[POST] /courses/store
    store(req, res, next){
        const obj = req.body;
        obj.image = `https://img.youtube.com/vi/${obj.videoId}/sddefault.jpg`
        const course = new Course(obj);
        course.save()
            .then(() => {
                res.redirect(`/courses/${course.slug}`)
            })
            .catch(next);

    }

     // [GET] /courses/:id/edit
     edit(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
         Course.findOne({_id: req.params.id})
         .then((course) => {
            res.render('courses/edit',{course: mongooseToObject(course), user});
         })
        .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/me/store/courses")
            })
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    force(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect("back")
            })
            .catch(next);
    }
}

module.exports = new CourseController;