const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const connect = () => {
    const connection = mongoose.createConnection(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true}, () => console.log('DB connected!'))
    autoIncrement.initialize(connection)
    return {autoIncrement, connection}
}


module.exports.connect = connect