const mongoose = require('mongoose')
const dbCon = require('../constants/dbCon')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    description: {
        type: String,
        required: true,
        max: 500,
        min: 10
    },
    price: {
        type: Number,
        required: true,
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    category:  {
        type: String,
        required: true
    },
    user_code: {
        type: Number,
        required: true
    }
})

productSchema.plugin(global.db.autoIncrement.plugin, {
    model: dbCon.COLLECTION_PRODUCT,
    field: 'id',
    startAt: 1
})
module.exports = global.db.connection.model(dbCon.COLLECTION_PRODUCT, productSchema)