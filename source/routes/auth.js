const router = require('express').Router()
const { registration } = require('../services/registration')
const { login } = require('../services/login')
const status  = require('http-status')
const comCon = require('../constants/comCon')
const {sendMail} = require('../services/forgotPass')
const {changePassword} = require('../services/resetPassword')


router.post('/register', async (req, res) => {
    try {
        const body = req.body
        const response = await registration(body)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
    
})



// Login API

router.post('/login', async (req,res) => {
    try {
        const response = await login(req.body)
        res.setHeader(comCon.FIELD_AUTH_TOKEN, response.token)
        res.setHeader(comCon.FIELD_USER_CODE, response[comCon.FIELD_USER_CODE])
        res.status(status.OK).send(comCon.MSG_LOGGEDIN)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.post('/forgot/password', async (req, res) => {
    try {
        const response = await sendMail(req.body)
        res.status(status.OK).send(response)
    } catch (err) {
        if (err.status) res.status(err.status).send({"error_message": err.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": err})
    }
})

router.post('/reset/password', async (req, res) => {
    try {
        const response = await changePassword(req.body)
        res.status(status.OK).send(response)
    } catch (err) {
        if (err.status) res.status(err.status).send({"error_message": err.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": err})
    }
})

module.exports = router