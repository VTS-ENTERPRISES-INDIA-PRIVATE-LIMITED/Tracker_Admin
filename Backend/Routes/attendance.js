const express = require('express');
const router = express.Router();
const connection = require('../db');
const createQueries=require('../Queries/Attendence/post.json')
const getQueries=require('../Queries/Attendence/get.json')
router.post('/postAttendance',async(req,res)=>{
    try{
        await connection.query(createQueries.CreateTableAttendance);
        const {Name,EmpId,Shift,Breakfast,Lunch,Dinner,CabinNo,IsPresent} = req.body;
        const [rows] = await connection.query(getQueries.idquery, [EmployeeID]);

        function getCurrentDateWithoutTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${day}/${month}/${year}`;
        }
        await connection.query(createQueries.PostAttendance,[Name,EmpId,Shift,Breakfast,Lunch,Dinner,CabinNo,getCurrentDateWithoutTime(),IsPresent]);
    }
    catch(error)
    {
        console.error('Error updating attendance status:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    
    }
});


module.exports=router;