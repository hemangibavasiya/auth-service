const jwt = require('jsonwebtoken')
const { getData, updateData } = require('../repository/commonRepo'),
_ = require('lodash')
const comCon = require('../constants/comCon'),
dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar'),
status  = require('http-status')

const verifyToken = (req, token, userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const authDetails = await getData({'token': token}, {_id:false}, dbCon.COLLECTION_USER_AUTHENTICATION)
            if(_.size(authDetails) === 0) return reject(errorGanerator(status.UNAUTHORIZED, comCon.MSG_INVALID_USER))

            if(new Date(authDetails[0][dbCon.FIELD_EXPIRES_ON]) < new Date()) {
                return reject(errorGanerator(status.UNAUTHORIZED, comCon.MSG_INVALID_TOKEN))
            }
            // const body = {}
            // body[dbCon.FIELD_EXPIRES_ON] = new Date()

            // const updatedData = await updateData({'user_code': userCode}, body, dbCon.COLLECTION_USER_AUTHENTICATION)
            // console.log('------------------------',updatedData)
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            return resolve(verified)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    verifyToken
}