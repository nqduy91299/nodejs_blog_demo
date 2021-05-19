const User = require('../Models/User')
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")

class AuthenticationController{



    // [GET] /login
    showLogin(req, res, next){
        return res.render('login', {layout: false});
    }

     // [POST] /login
    login(req, res, next){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const {username, password} = req.body;
            User.findOne({username: username})
                .then((user) => {
                    if(!!!user){
                        return res.render('login', {layout: false, err: 'Đăng nhập không thành công'})
                    }else{
                        if (bcrypt.compareSync(password, user.password)){
                            req.session.user = user
                            return res.redirect('/');
                        }else{
                            return res.render('login', {layout: false, err: 'Đăng nhập không thành công'})
                        }
                    }
                })
                .catch(next)
        }else{
            return res.render('login', {layout: false, err: resultValidation?.errors[0].msg})
        }
    }

    // [GET] /register
    showRegister(req, res, next){
        return res.render('register', {layout: false});
    }

    // [POST] /register
    register(req, res, next){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length === 0){
            const {name, username, password} = req.body;
            User.findOne({username: username})
                .then((user) => {
                    if(user){
                        return res.render('register', {layout: false, err: 'Tạo tài khoản không thành công'})
                    }else{
                        const userAccount = new User({
                            name: name,
                            username: username,
                            password: bcrypt.hashSync(password, 10),
                            role: 1,
                            avatar: 'avatar_default.png'
                        })
                        userAccount.save()
                            .then((userCreate) => {
                                if(!!!userCreate){
                                    return res.render('register', {layout: false, err: 'Tạo tài khoản không thành công'})
                                }else{
                                    req.session.user = userCreate;
                                    return res.redirect('/')
                                }
                            })
                            .catch(next)
                    }
                })
                .catch(next)
        }else{
            return res.render('register', {layout: false, err: resultValidation?.errors[0].msg})
        }
    }

    // [GET] /logout
    logout(req, res, next){
        req.session.user = null;
        return res.redirect('/')
    }

}

module.exports = new AuthenticationController;