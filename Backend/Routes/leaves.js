const express = require('express');
const router = express.Router();
const connection = require('../db');
const createQueries=require('../Queries/Leaves/post.json')
const getQueries=require('../Queries/Leaves/get.json')

router.post('/postLeaveRequest', async (req, res) => {
    try {
        await connection.query(createQueries.CreateLeavesTables);
        const {Name,EmpId,Subject,Reason,StartDate,EndDate,NoOfDays } = req.body;
        await connection.query(createQueries.PostLeaves, [Name, EmpId, Subject,Reason,StartDate,EndDate,NoOfDays]);
        res.status(200).send({ message: "Leave applied successfully." });
    } catch (error) {
        console.error('Error in applying leave', error.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.put('/updateLeaveRequest', async (req, res) => {
    const { requestId,status } = req.body; 
    if (!requestId) {
        return res.status(400).send({ error: "Request ID is required." });
    }
    try {
        const [result] = await connection.query(getQueries.updateStatus, [status, requestId]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Leave request not found." });
        }

        res.status(200).send({ message: "Leave request status updated to approved." });
    } catch (error) {
        console.error('Error updating status:', error.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/getleaverequests',async (req,res)=>{
    try {
        const [results] = await connection.query(getQueries.getleaves);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving leave requests:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/getleaves/:empid',async (req,res)=>{
    const {empid}=req.params;
    try {
        const [results] = await connection.query(getQueries.getLeavesByEmployeeId,[empid]);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving leaves:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});
module.exports=router;