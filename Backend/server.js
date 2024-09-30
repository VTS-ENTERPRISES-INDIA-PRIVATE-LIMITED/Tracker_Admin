const express = require('express')
const app=express();
const env = require('dotenv').config();
const connection=require('./db');
const cors = require('cors');

app.use(cors({ origin: '*' }));


app.use(express.json());





app.listen(process.env.PORT,()=>{
    console.log("running on port:",process.env.PORT)
})