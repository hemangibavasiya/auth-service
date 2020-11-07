const { productBodyValidation } = require('../common/validation')
const {errorGanerator} = require('../common/errorHandlar')
const { saveData} = require('../repository/commonRepo')
const status  = require('http-status')
const dbCon = require('../constants/dbCon')


const addProductData = (userCode, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { error } = productBodyValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            const insertJSon = {}
            insertJSon[dbCon.FIELD_NAME] = body.name
            insertJSon[dbCon.FIELD_DESCRIPTION] = body.description
            insertJSon[dbCon.FIELD_PRICE] = body.price
            insertJSon[dbCon.FIELD_CATEGORY] = body.category
            insertJSon[dbCon.FIELD_USER_CODE] = userCode
            const insertData = await saveData(insertJSon, dbCon.COLLECTION_PRODUCT)
            return resolve(insertData)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    addProductData
}