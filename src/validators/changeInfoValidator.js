const {check} = require("express-validator")

module.exports = [
  check("name")
    .exists().withMessage('Vui lòng nhập name')
    .notEmpty().withMessage('Tên không được để trống'),
]

