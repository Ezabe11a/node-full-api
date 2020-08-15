// 生成token
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

function createToken(data) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data: data,
    }, 'secret')

}

// 解密并验证token
function verifyToken(req, res) {
    let token = req.headers.authorization
    if (!token) {
        return res.json({ err: -1, msg: 'token invalid' })
    }
    return new Promise(function (resolve, reject) {
        try {
            let decoded = jwt.verify(token, 'secret')
            resolve(decoded.data)
        } catch (err) {
            // reject({err:-1,msg:'token invalid'})
            res.json({ err: -1, msg: 'token invalid' })
        }
    })
}

module.exports = {
    createToken, verifyToken
}