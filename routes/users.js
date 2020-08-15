var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel');
const jwt = require('../utils/jwt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function (req, res, next) {
  // 查询数据库
  userModel.find({}).then(arr => {
    // console.log(arr);
    res.json({ err: 0, msg: 'success', data: { list: arr } })
  })
  // res.send('respond with a resource');
});

// 管理系统
// 注册
router.post('/cms/regist', function (req, res, next) {
  let { username, password, password2 } = req.body

  userModel.find({ username }).then(arr => {
    if (arr.length > 0) {
      res.json({ err: 1, msg: '当前用户名已占用' })
    } else {
      let user = {
        username,
        password,
        create_time: Date.now()
      }
      userModel.insertMany([user]).then(() => {
        res.json({ err: 0, msg: '注册成功' })
      })
    }
  })
})

// 登录
router.post('/cms/login', function (req, res, next) {
  let { username, password } = req.body

  userModel.find({ username, password }).then(arr => {
    if (arr.length == 1) {
      res.json({ err: 0, msg: '登陆成功', data: { 
        token: jwt.createToken({username,password}),
        userModel
      } })
      res.json(data)
    }
  })
})

module.exports = router;
