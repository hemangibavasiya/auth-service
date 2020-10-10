const router = require('express').Router();
const comCon = require('../constants/comCon');
const verify = require('./verifyToken')
const { fetchData } = require('../services/display'),
status  = require('http-status')

router.get('/display', verify, async (req, res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await fetchData(userCode)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})
module.exports = router