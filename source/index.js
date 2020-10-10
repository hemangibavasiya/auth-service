const express = require('express')
const dotenv = require('dotenv')


dotenv.config()

const dbCon = require('./repository/db')

global.db = dbCon.connect()
require('./model/modelExport')

const app = express()


app.listen(process.env.PORT, () => console.log('server is up now'))

// Routes
const authRoute = require('./routes/auth')
const postRoutes = require('./routes/post')
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoutes)
