
const getData = async (query, projection, collectionName) => {
    try { 
        const model = global.db.connection.model(collectionName)
        const response = await model.find(query, projection).exec()
        return response
    } catch(err) {
        throw err
    }
}

const updateData = async (query, data, collectionName) => {
    try {
      const model = global.db.connection.model(collectionName)
      const response = await model.updateMany(query, getUpdateJsonFormat(data), getUpdatedJsonInResponse(true)).exec()
      return response
    } catch (error) {
      throw error
    }
}

const insertData = async (data, collectionName) =>{
    try {
        const model = global.db.connection.model(collectionName)
        const response = await model.insertMany(data)
        return response
    } catch (error) {
        throw error
    }
}

const saveData = async (data, collectionName) => {
    try {
        const model = global.db.connection.model(collectionName)
        const dataModel = new model(data)
        const response = await dataModel.save()
        return response
    } catch (error) {
        throw error
    }
}

const getUpdateJsonFormat = (updateJson) => {
    let json = {}
    json['$set'] = updateJson
    return json
  }
  
  const getUpdatedJsonInResponse = (value) => {
    let json = {}
    json['new'] = value
    return json
  }
  

module.exports = {
    getData,
    insertData,
    saveData,
    updateData
}