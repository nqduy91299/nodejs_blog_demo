const Blog = require('../Models/Blog')
const Comment = require('../Models/Comment')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const {validationResult} = require("express-validator");


class BlogController{

    // [GET] /blog/:slug
    detail(req, res, next){
        const notify = req.flash('notify');
        let user = req.session?.user;
        
        Blog.findOne({slug: req.params.slug}).populate('createdBy', '-password').populate({path: "comment", populate: {path: 'createdBy'}}).select(["-__v"])
            .then((blog => {
                console.log(mongooseToObject(blog))
                return res.render('blog/detail', {
                    blog: mongooseToObject(blog),
                    user: user,
                    notify: notify[0]
                })
            })) 
            .catch(next)
    }

    // [GET] /blog/create
    create(req, res, next){
        const notify = req.flash('notify');
        return res.render('blog/create', {
            user: req.session?.user,
            notify: notify[0]
        })
    }


    store(req, res, next){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            let obj = req.body;
            if(req.file != undefined){
                obj.image = req.file.filename
            }
            obj.createdBy = req.session?.user?._id
            const blog = new Blog(obj)
            blog.save()
                .then((docs) => {
                    if(docs){
                        const notify = {isSuccess: true, msg: 'Tạo blog mới thành công'} 
                        req.flash('notify', notify)
                        return res.redirect('/blog')
                    }
                    
                })
                .catch(next)
        }else{
            const notify = {isSuccess: false, msg: resultValidation?.errors[0].msg}
            req.flash('notify', notify);
            res.redirect('/blog/create');
        }
    }


    // [GET] /blog/:id/edit
    edit(req, res, next){
        const notify = req.flash('notify');
        const user = req.session?.user;
        
        Blog.findOne({_id: req.params.id, createdBy: user?._id})
            .then((blog) => {
                let nBlog = mongooseToObject(blog);
                if(notify[0]?.oldData){
                    nBlog.title = notify[0].oldData.title
                    nBlog.content = notify[0].oldData.content
                }
                res.render('blog/edit',{
                    blog: nBlog, 
                    user,
                    notify: notify[0]
                });
            })
            .catch(next);

    }

    // [PUT] /blog/:id
    update(req, res, next){
        const {id} = req.params
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const user = req.session?.user;
            let obj = req.body;
            if(req.file != undefined){
                obj.image = req.file.filename
            }else{
                delete obj.image
            }
    
            Blog.findOneAndUpdate({_id: id, createdBy: user?._id}, obj)
                .then(() => {
                    const notify = {isSuccess: true, msg: "Lưu thay đổi thành công"}
                    req.flash('notify', notify);
                    res.redirect('/me/store/blogs');
                })
                .catch(next);
        }else{
            const notify = {isSuccess: false, msg: resultValidation?.errors[0].msg, oldData: req.body}
            req.flash('notify', notify);
            res.redirect(`/blog/${id}/edit`);
        }
    }

    // [DELETE] /blog/:id
    delete(req, res, next){
        Blog.delete({_id: req.params.id})
            .then(() => {
                const notify = {isSuccess: true, msg: 'Thao tác thành công'}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }

    // [DELETE] /blog/:id/force
    force(req, res, next){
        Blog.deleteOne({_id: req.params.id})
            .then(() => {
                const notify = {isSuccess: true, msg: 'Thao tác thành công'}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }

    // [PATCH] /blog/:id/restore
    restore(req, res, next){
        Blog.restore({_id: req.params.id})
            .then(() => {
                const notify = {isSuccess: true, msg: 'Thao tác thành công'}
                req.flash('notify', notify);
                res.redirect("back")
            })
            .catch(next);
    }
}

module.exports = new BlogController;