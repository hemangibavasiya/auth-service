
const getData = async (query, projection, collectionName) => {
    try { 
        const model = global.db.connection.model(collectionName)
        const response = await model.find(query, projection).exec()
        return response
    } catch(err) {
        throw err
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

module.exports = {
    getData,
    insertData,
    saveData
}