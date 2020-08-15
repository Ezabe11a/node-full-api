var express = require('express')
var router = express.Router()
const goodsModel = require('../model/goodsModel')

// 提交商品信息
router.post('/creategoods', function (req, res, next) {
    let { id, name, desc, price, cate, img, hot, rank } = req.body
    let ele = {
        name, desc, price, cate, img, hot, rank,
        
    }
    if (id) {
        goodsModel.updateOne({_id:id},{$set:ele}).then(() => {
            res.json({err: 0, msg: 'success'})
        })
    } else {
        ele.create_time = Date.now()
        goodsModel.insertMany([ele]).then(()=>{
            res.json({err:0,msg:'添加成功'})
        })

    } 
})
// 获取商品列表
router.get('/getGoodAll', function (req, res) {
    let { page, size, cate } = req.query
    page = parseInt(page ? page : 1)
    size = parseInt(size ? size : 2)

    // 商品类别筛选
    let c = {
        cate: cate ? cate : ''
    }
    if (!c.cate) delete c.cate
    goodsModel.find(c).then((arr) => {
        // 总条数
        let total = arr.length
        // 计算页数
        goodsModel.find(c).skip((page - 1) * size).limit(size).sort({ rank: -1 }).then(arr => {
            res.json({ err: 0, msg: 'success', data: { list: arr, total } })
        })
    })
})

// 获取商品详情
router.get('/detail', function (req, res) {
    let { id } = req.query

    goodsModel.find({ _id: id }).then(arr => {
        res.json({ err: 0, msg: 'success', data: arr[0] })
    })
})

// // 获取商品品类
// router.get('/cates', function (req, res) {
//     goodsModel.find({}).then(arr => {
//         res.json({ err: 0, msg: 'success', data: { data: arr } })
//     })
// })
module.exports = router