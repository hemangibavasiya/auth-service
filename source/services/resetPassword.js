const { resetValidation } = require('../common/validation')
const bcrypt = require('bcryptjs')
const {errorGanerator} = require('../common/errorHandlar')
const comCon = require('../constants/comCon')
const { getData, updateData} = require('../repository/commonRepo')
const status  = require('http-status')
const dbCon = require('../constants/dbCon')
const _ = require('lodash')

const changePassword = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = resetValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            const emailExist = await getData({ email: body.email }, {}, dbCon.COLLECTION_USERS)
            if (_.size(emailExist) === 0) return reject(errorGanerator(status.BAD_REQUEST, comCon.MSG_EMAIL_NOT_EXIST))

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(body.password, salt)

            const data = {}
            data[dbCon.FIELD_PASSWORD] = hashedPassword

            const query = {}
            query[dbCon.FIELD_EMAIL] = body.email

            const updatedData = await updateData(query, data,  dbCon.COLLECTION_USERS)

            resolve(updatedData)

        } catch (err) {
            return reject(err)
        }
    })
}

module.exports = {
    changePassword
}