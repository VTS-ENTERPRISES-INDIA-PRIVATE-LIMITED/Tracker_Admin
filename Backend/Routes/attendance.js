const express = require('express');
const router = express.Router();
const connection = require('../db');
const createQueries=require('../Queries/Attendence/post.json')
const getQueries=require('../Queries/Attendence/get.json')
router.post('/postAttendance', async (req, res) => {
    try {
        await connection.query(createQueries.CreateTableAttendance);

        const { Name, EmpId, Shift, Breakfast, Lunch, Dinner, CabinNo } = req.body;

        function getCurrentDateWithoutTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${day}/${month}/${year}`;
        }

        // Ensure the query matches the number of values being inserted
        await connection.query(createQueries.PostAttendance, [Name, EmpId, Shift, Breakfast, Lunch, Dinner, CabinNo, getCurrentDateWithoutTime()]);
        res.status(200).send({ message: "Attendance updated successfully." });
    } catch (error) {
        console.error('Error updating attendance status:', error.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/getShifts',async (req,res)=>{
    try {
        const [results] = await connection.query(getQueries.getByShift);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving attendance:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/getCabin',async (req,res)=>{
    try {
        const [results] = await connection.query(getQueries.getByCabin);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving attendance:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/getPresentEmployeeCount',async (req,res)=>{
    try {
        const [results] = await connection.query(getQueries.getpresenteecount);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving attendance:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

function convertDateToDDMMYYYY(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

router.get('/getAttendanceByDate/:date', async (req, res) => {
    const { date } = req.params;
    const formattedDate = convertDateToDDMMYYYY(date);

    try {
        const [results] = await connection.query(getQueries.getattendencebyDate, [formattedDate]);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving attendance:', err.stack);
        res.status(500).send({ error: "Internal server error." });
    }
});

router.get('/dinnercount', async (req, res) => {
    try {
        const [rows] = await connection.query(getQueries.getDinnercount);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/breakfastcount', async (req, res) => {
    try {
        const [rows] = await connection.query(getQueries.getbreakfastcount);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/lunchcount', async (req, res) => {
    try {
        const [rows] = await connection.query(getQueries.getLunchcount);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;