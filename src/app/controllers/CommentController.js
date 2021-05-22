const { validationResult } = require("express-validator");
const Blog = require("../Models/Blog");
const Comment = require("../Models/Comment");

class CommentController{
    // [POST] /blog/:id/comment/:slug
    comment(req, res, next) {
        const {id, slug} = req.params;
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const user = req.session?.user;
            const commentObj = req.body;
            const comment = new Comment({comment: commentObj.comment, createdBy: user?._id})
            comment.save()
                .then((docs) => {
                    if(docs){
                        Blog.findOneAndUpdate({_id: id}, {
                            $push: {
                                comment: docs._id
                            }
                        })
                            .then(post => {
                                if(post){
                                    const notify = {isSuccess: true, msg: 'Bình luận thành công'}
                                    req.flash('notify', notify);
                                    res.redirect(`/blog/${slug}`);
                                }else{
                                    const notify = {isSuccess: false, msg: 'Bình luận thất bại'}
                                    req.flash('notify', notify);
                                    res.redirect(`/blog/${slug}`);
                                }
                            })
                            .catch(next)
                    }else{
                        const notify = {isSuccess: false, msg: 'Bình luận thất bại'}
                        req.flash('notify', notify);
                        res.redirect(`/blog/${slug}`);
                    }
                })
                .catch(next)    
        }else{
            const notify = {isSuccess: false, msg: resultValidation?.errors[0].msg}
            req.flash('notify', notify);
            res.redirect(`/blog/${slug}`);
        }
        
    }
}


module.exports = new CommentController;