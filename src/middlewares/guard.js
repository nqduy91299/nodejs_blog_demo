const guard = (req, res, next) => {
    if(req.session?.user){
        next()
    } else {
        const notify = {isSuccess: false, msg: "Bạn không đủ quyền thực hiện thao tác này"}
        req.flash('notify', notify);
        res.redirect('/');
    }
}

module.exports = guard;