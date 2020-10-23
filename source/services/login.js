const { loginValidation } = require('../common/validation')
const bcrypt = require('bcryptjs'),
jwt = require('jsonwebtoken')
const {errorGanerator} = require('../common/errorHandlar')
const comCon = require('../constants/comCon'),
dbCon = require('../constants/dbCon'),
status  = require('http-status'),
_ = require('lodash')
const { getData, saveData } = require('../repository/commonRepo')



const login = (body) => {
    return new Promise(async (resolve, reject) => {
        try {

            // validate body
            const { error } = loginValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            // check user is exists
            const user = await getData({ email: body.email }, {"_id":false}, dbCon.COLLECTION_USERS)
            if(_.size(user) === 0) return reject(errorGanerator(status.BAD_REQUEST, comCon.MSG_INVALID_USER))
            // Compare password
            const validPass = await bcrypt.compare(body.password, user[0].password)
            if(!validPass) return reject(errorGanerator(status.BAD_REQUEST, comCon.MSG_INVALID_PASSWORD))
            // check user assigned in  https://jwt.io/
            const token = jwt.sign({_id: user[0].email}, process.env.TOKEN_SECRET, {expiresIn: '2h'})
            let expiresInMinutes = new Date()
            expiresInMinutes.setMinutes(expiresInMinutes.getMinutes() + 120)
            expiresInMinutes = new Date(expiresInMinutes)
            const insertJSon = {}
            insertJSon[comCon.FIELD_USER_CODE] = user[0].id
            insertJSon[comCon.FIELD_TOKEN] = token  
            insertJSon[dbCon.FIELD_EXPIRES_ON] = expiresInMinutes
            const saveAuthenticationData = await saveData(insertJSon, dbCon.COLLECTION_USER_AUTHENTICATION)
            const finalResponse = {}
            finalResponse[comCon.FIELD_TOKEN] = token
            finalResponse[comCon.FIELD_USER_CODE] = user[0][dbCon.FIELD_ID]
            return resolve(finalResponse)

        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    login
}