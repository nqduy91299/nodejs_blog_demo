const {check} = require("express-validator")
const { body } = require('express-validator');


const check_rePassword = body('repassword').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password không khớp nhau');
  }

  return true;
})

module.exports = [
  check("name")
    .exists().withMessage('Vui lòng nhập name')
    .notEmpty().withMessage('Tên không được để trống'),
  check("username")
    .exists().withMessage('Vui lòng nhập username')
    .notEmpty().withMessage('Username không được để trống'),

  check("password")
    .exists().withMessage("Vui lòng nhập mật khẩu")
    .notEmpty().withMessage("Không để trống mật khẩu"),
    
  check_rePassword
]

