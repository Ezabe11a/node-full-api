var express = require('express')
var router = express.Router()
var cateModel = require('../model/cateModel')

router.post('/add', function (req, res, next) {
    let { cate, cate_zh } = req.body
    let ele = {
        cate,
        cate_zh,
        create_time: Date.now()
    }
    cateModel.insertMany([ele]).then(() => {
        res.json({ err: 0, msg: 'success' })
    })
})

router.get('/all', function (req, res) {
    cateModel.find({}).then(arr => {
        res.json({ err: 0, msg: 'success', data: { list: arr } })
    })
})

module.exports = router