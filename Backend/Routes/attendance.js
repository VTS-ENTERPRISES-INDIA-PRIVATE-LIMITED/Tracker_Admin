const express = require('express');
const router = express.Router();
const connection = require('../db');
const createQueries=require('../Queries/Attendence/post.json')
const getQueries=require('../Queries/Attendence/get.json')
const bcrypt = require('bcrypt');

router.post('/loginEmployee', async (req, res) => {
    const { EmployeeID, Password } = req.body;

    if (!EmployeeID || !Password) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {

        // if (EmployeeID === 'admin123' && Password === 'admin123') {
        //     return res.status(200).send({ message: "Admin login successful.", userType: "admin" });
        // }
        const [rows] = await connection.query(getQueries.getEmployeeById, [EmployeeID]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "Employee not found." });
        }

        const employee = rows[0];
        const isMatch = await bcrypt.compare(Password, employee.Password);

        if (!isMatch) {
            return res.status(401).send({ error: "Incorrect password." });
        }
       
        return res.status(200).send({ message: "Login successful.",EmployeeId:rows[0].EmployeeID, FullName:rows[0].FullName ,EmailAddress:rows[0].EmailAddress});

    } catch (error) {
        console.log("Error in login:", error.stack);
        return res.status(500).send({ error: "Internal server error." });
    }
});

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

router.get('/getAllEmployees', async (req, res) => {
    try {
        const [rows] = await connection.query(getQueries.getall);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;