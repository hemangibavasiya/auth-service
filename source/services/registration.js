const { registerValidation } = require('../common/validation')
const bcrypt = require('bcryptjs')
const {errorGanerator} = require('../common/errorHandlar')
const comCon = require('../constants/comCon')
const { getData, saveData} = require('../repository/commonRepo')
const status  = require('http-status')
const dbCon = require('../constants/dbCon')
const _ = require('lodash')
const {Mail} = require('./mailService')

const registration = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            // validate body
            const { error } = registerValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            // check email is exists
            const emailExist = await getData({ email: body.email }, {}, dbCon.COLLECTION_USERS)
            if (_.size(emailExist) !== 0) return reject(errorGanerator(status.BAD_REQUEST, comCon.MSG_EMAIL_ALREADY_EXISTS))

            // hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(body.password, salt)

            const user = {}
            user[dbCon.FIELD_NAME] = body.name
            user[dbCon.FIELD_EMAIL] = body.email
            user[dbCon.FIELD_PASSWORD] = hashedPassword
            const savedUser = await saveData(user, dbCon.COLLECTION_USERS)

            const mailOptions = {}
            mailOptions[comCon.FIELD_FROM] = '#############@gmail.com'
            mailOptions[comCon.FIELD_TO] = body.email
            mailOptions[comCon.FIELD_SUBJECT] = 'Welcome Mail'
            mailOptions[comCon.FIELD_TEXT] = 'Hello ' + body.name + '\n Thanks for the connecting with us\n we try to provide our best service with you\n Thanks & Regards \n ABC company'

            const mailRes = await Mail(mailOptions)
            return resolve(savedUser)
        } catch (err) {
            return reject(err)
        }
    })
}

module.exports = {
    registration
}