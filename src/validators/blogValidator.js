const {check} = require("express-validator")

module.exports = [
    check("title")
    .exists().withMessage('Vui lòng nhập Tiêu đề')
    .notEmpty().withMessage('Tiêu đề không được để trống'),

    check("content")
    .exists().withMessage("Vui lòng nhập nội dung")
    .notEmpty().withMessage("Nội dung không để trống"),
]
