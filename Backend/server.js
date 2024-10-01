const express = require('express')
const app=express();
const env = require('dotenv').config();
const cors = require('cors');
const attendance = require('./Routes/attendance')
const leaves=require('./Routes/leaves')
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/attendance',attendance);
app.use('/leaves',leaves)
app.get('/',(req,res)=>{
    res.send("Server running")
})

app.listen(5000,()=>{
    console.log("running on port:",5000)
})