const {check} = require("express-validator")
const { body } = require('express-validator');


const check_rePassword = body('repassword').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Mật khẩu không khớp nhau');
  }

  return true;
})

const duplicate_oldPwd = body('oldPassword').custom((value, { req }) => {
  if (value === req.body.password) {
    throw new Error('Mật khẩu mới không được trùng mật khẩu cũ');
  }

  return true;
})

module.exports = [
  check("oldPassword")
    .exists().withMessage("Vui lòng nhập mật khẩu cũ")
    .notEmpty().withMessage("Không để trống mật khẩu cũ"),
  
  check("password")
    .exists().withMessage("Vui lòng nhập mật khẩu mới")
    .notEmpty().withMessage("Không để trống mật khẩu mới"),
    
  check_rePassword,
  duplicate_oldPwd
]

