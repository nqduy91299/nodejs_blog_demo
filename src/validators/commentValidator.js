const {check} = require("express-validator")

module.exports = [
    check("comment")
    .exists().withMessage('Vui lòng nhập Bình luận')
    .notEmpty().withMessage('Bình luận không được để trống'),
]
