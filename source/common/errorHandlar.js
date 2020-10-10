const comCon = require('../constants/comCon')
const errorGanerator = (status, messaage) => {
    const errorJson = {}
    errorJson[comCon.FIELD_STATUS] = status
    errorJson[comCon.FIELD_MESSAGE] = messaage
    return errorJson
}

module.exports = {
    errorGanerator
}