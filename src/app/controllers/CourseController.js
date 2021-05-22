const Course = require('../Models/Course')
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');
const { youTubeIdGet } = require('../../util/youTube');

class CourseController{

    index(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
       Course.find({})
            .then((courses) => {
                const notify = req.flash('notify');
                res.render('home', {
                    courses: multipleMongooseToObject(courses), 
                    user, 
                    notify: notify[0]
                });
            })
            .catch(next);
    }
    
    // [GET] /courses/:slug
    show(req, res, next){
        let user = '';
        if(req.session?.user){
            user = req.session?.user;
        }
        Course.findOne({slug: req.params.slug}).populate('createdBy', '-password').select(["-__v"])
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
        const notify = req.flash('notify');
        res.render('courses/create', {
            user, 
            notify: notify[0]
        });
    }

    //[POST] /courses/store
    store(req, res, next){
        const obj = req.body;
        obj.videoId = youTubeIdGet(obj.videoId);
        obj.image = `https://img.youtube.com/vi/${obj.videoId}/sddefault.jpg`
        obj.createdBy = req.session?.user?._id
        const course = new Course(obj);
        course.save()
            .then(() => {
                const notify = {isSuccess: true, msg: 'Tạo blog mới thành công'} 
                req.flash('notify', notify)
                return res.redirect(`/courses/${course.slug}`)
            })
            .catch(next);

    }

     // [GET] /courses/:id/edit
    edit(req, res, next){
        const user = req.session?.user;

        Course.findOne({_id: req.params.id, createdBy: user?._id})
            .then((course) => {
            res.render('courses/edit',{course: mongooseToObject(course), user});
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next){
        const obj = req.body;
        obj.videoId = youTubeIdGet(obj.videoId);
        obj.image = `https://img.youtube.com/vi/${obj.videoId}/sddefault.jpg`

        Course.updateOne({_id: req.params.id}, obj)
            .then(() => {
                const notify = {isSuccess: true, msg: "Lưu thay đổi thành công"}
                req.flash('notify', notify);
                res.redirect("/me/store/courses")
            })
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => {
                const notify = {isSuccess: true, msg: "Thao tác thành công"}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => {
                const notify = {isSuccess: true, msg: "Thao tác thành công"}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    force(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => { 
                const notify = {isSuccess: true, msg: "Thao tác thành công"}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }
}

module.exports = new CourseController;