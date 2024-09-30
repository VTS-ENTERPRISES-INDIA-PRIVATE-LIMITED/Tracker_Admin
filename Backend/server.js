const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
const cors = require('cors')
app.use(cors())


app.listen(5000,()=>{
    console.log('server is running on port 5000')
})