const { verifyToken } = require('../services/verify')

module.exports = async function (req, res, next) {
    const token = req.header('auth-token')
    const userCode = req.header('user_code')
    if(!token) return res.status(401).send('Access Denied')
    try {
        const response = await verifyToken(req, token, userCode)
        req.user = response
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}