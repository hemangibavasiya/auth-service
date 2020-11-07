const comCon = require('../constants/comCon'),
dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar'),
status  = require('http-status')
const { getData } = require('../repository/commonRepo'),
_ = require('lodash')


const fetchData = (userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getData({ user_code: userCode }, {_id:false}, dbCon.COLLECTION_PRODUCT)
            if(_.size(response) === 0) return reject(errorGanerator(status.NO_CONTENT, comCon.MSG_NO_CONTENT))
            return resolve(response)

        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    fetchData
}
