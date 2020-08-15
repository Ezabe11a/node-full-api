let express = require('express')
let router = express.Router()
let multiparty = require('multiparty')
let path = require('path')
let fs = require('fs')

router.post('/img', function (req, res, next) {
    let form = new multiparty.Form()
    // form.parse作用：把req中的图片数据转化成文件存到服务器
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.json({ err: 1, msg: '图片上传失败' })
        } else {
            const file = files.file[0]
            // files:{
            //     file:[
            //         {
            //          filedname:
            //          originalFilename: 文件名
            //          path:
            //          ....
            //         }
            //     ]
            // }
            let now = Date.now()
            // fs模块进行读写
            // 读
            let readStream = fs.createReadStream(file.path)

            let pa = path.join(__dirname, '../public/imgs/' + now + "-" + file.originalFilename)
            // 写
            let writeStream = fs.createWriteStream(pa)

            readStream.pipe(writeStream)
            writeStream.on('close', function() {
                let data = {
                    url:`/imgs/${now}-${file.originalFilename}`
                }
                res.json({err: 1, msg: 'success', data})
            })
        }
    })
})


module.exports = router