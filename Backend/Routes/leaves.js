const express = require('express');
const router = express.Router();
const connection = require('../db');
const createQueries=require('../Queries/Leaves/post.json')
const getQueries=require('../Queries/Leaves/get.json')
const nodemailer = require('nodemailer'); 

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


    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user:'drajyalakshmi03@gmail.com',
            pass:'cnqu rhfb crvx gqei'
        },
    });
    
    
    router.put('/approve-leave/:requestId', async (req, res) => {
        const { requestId } = req.params;
    
        if (!requestId) {
            return res.status(400).send({ error: "Request ID is required." });
        }
    
        try {
            const [leaveDetails] = await connection.query(getQueries.getDetailsByrequestID, [requestId]);
            if (!leaveDetails || leaveDetails.length === 0) {
                return res.status(404).send({ error: "Leave request not found." });
            }
            const { Name, StartDate, EndDate, NoOfDays} = leaveDetails[0];
            const [result] = await connection.query(getQueries.updateStatus, ['Approved', requestId]);
    
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "Failed to update the leave request status." });
            }
            const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Leave Request Status</title>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Inter', Arial, sans-serif;
                  background-color: #f0f0f5;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  padding: 30px;
                }
                .header {
                  background-image: url('https://res.cloudinary.com/dvmkt80vc/image/upload/v1720537847/WhatsApp_Image_2024-07-09_at_8.34.38_PM_xtzvwx.jpg');
                  background-size: cover;
                  background-position: center;
                  color: #ffffff;
                  padding: 25px;
                  height: 65px;
                  text-align: right;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  margin: -30px -30px 20px -30px;
                }
                .header h1 {
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                }
                  .content h4 {
                  text-align:center;
                  }
                .content p {
                  margin: 15px 0;
                }
                  .highlight-box {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 10px;
                    font-weight: 600;
                    font-size: 18px;
                    text-align: center;
                    color: black;
                }
                .footer {
                  background-color: #030940b4;
                  color: #ffffff;
                  padding: 15px;
                  text-align: center;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  margin: 20px -30px -20px -30px;
                }
                .footer p {
                  margin: 0;
                  font-size: 14px;
                }
                .company-info {
                  text-align: left;
                  font-size: 14px;
                  margin: 20px 0; 
                  color: #333333; 
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header"></div>
                <div class="content">
                 <h4>Your Request has been Approved</h4>
                  <p>Dear ${Name},</p>
                  <p>We are pleased to inform you that your leave request has been approved. We appreciate your dedication and commitment to your responsibilities.</p>
                   <div class="highlight-box">
                    <p><strong>Start Date:</strong> ${StartDate}</p>
                    <p><strong>End Date:</strong> ${EndDate}</p>
                    <p><strong>No of Days:</strong> ${NoOfDays}</p>
                   </div>
                  <p>If you have any questions or need further assistance regarding your leave, please feel free to reach out to us.</p>
                  <p>Thank you for your understanding, and enjoy your time off!</p>
                </div>
                <div class="company-info">
                    <p>Best regards,</p>
                    <p><a href="https://www.vtsenterprisesindia.com/" style="color: #0e9022; text-decoration: none;">VTS ENTERPRISES INDIA PRIVATE LIMITED</a></p>
                    <p>SRP Stratford, Rajiv Gandhi Salai,</p>
                    <p>Thiruvanmiyur, Chennai - 600041.</p>
                    <p>The Hive, OMR Chennai.</p>
                    <p>TAMILNADU, INDIA.</p>
                  </div>
                <div class="footer">
                  <p>© VTS Enterprises India Private Limited. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
            `;
    
           
            await transporter.sendMail({
                from: 'drajyalakshmi03@gmail.com', 
                to: 'dasariamrutha3@gmail.com', 
                subject: 'Leave Request Approved',
                html: emailHtml, 
            });
    
            res.status(200).send({ message: "Leave request status updated to approved and email sent." });
    
        } catch (error) {
            console.error('Error updating status or sending email:', error.stack);
            res.status(500).send({ error: "Internal server error." });
        }
    });
    
    router.put('/RejectRequest/:requestId', async (req, res) => {
        const { requestId } = req.params;
        try {
            const [leaveDetails] = await connection.query(getQueries.getDetailsByrequestID, [requestId]);
            if (!leaveDetails || leaveDetails.length === 0) {
                return res.status(404).send({ error: "Leave request not found." });
            }
            const { Name} = leaveDetails[0];
            const [result] = await connection.query(getQueries.updateStatus, ['Approved', requestId]);
    
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: "Failed to update the leave request status." });
            }
            const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Leave Request Status</title>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Inter', Arial, sans-serif;
                  background-color: #f0f0f5;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  padding: 30px;
                }
                .header {
                  background-image: url('https://res.cloudinary.com/dvmkt80vc/image/upload/v1720537847/WhatsApp_Image_2024-07-09_at_8.34.38_PM_xtzvwx.jpg');
                  background-size: cover;
                  background-position: center;
                  color: #ffffff;
                  padding: 25px;
                  height: 65px;
                  text-align: right;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  margin: -30px -30px 20px -30px;
                }
                .header h1 {
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                }
                  .content h4{
                  text-align:center}
                .content p {
                  margin: 15px 0;
                }
                .footer {
                  background-color: #030940b4;
                  color: #ffffff;
                  padding: 15px;
                  text-align: center;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  margin: 20px -30px -20px -30px;
                }
                .footer p {
                  margin: 0;
                  font-size: 14px;
                }
                .company-info {
                  text-align: left;
                  font-size: 14px;
                  margin: 20px 0; 
                  color: #333333; 
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header"></div>
                <div class="content">
                 <h4>Your Request has been Rejected</h4>
                  <p>Dear ${Name},</p>
                  <p>We regret to inform you that your leave request has been rejected. We appreciate your understanding in this matter.</p>
                  <p>If you have any questions or would like to discuss this further, please feel free to reach out to us.</p>
                </div>
                <div class="company-info">
                  <p>Best regards,</p>
                  <p><a href="https://www.vtsenterprisesindia.com/" style="color: #0e9022; text-decoration: none;">VTS ENTERPRISES INDIA PRIVATE LIMITED</a></p>
                  <p>SRP Stratford, Rajiv Gandhi Salai,</p>
                  <p>Thiruvanmiyur, Chennai - 600041.</p>
                  <p>The Hive, OMR Chennai.</p>
                  <p>TAMILNADU, INDIA.</p>
                </div>
                <div class="footer">
                  <p>© VTS Enterprises India Private Limited. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
            `;
    
           
            await transporter.sendMail({
                from: 'drajyalakshmi03@gmail.com', 
                to: 'dedeepyagelli@gmail.com',
                subject: 'Leave Request Rejected',
                html: emailHtml, 
            });
    
            res.status(200).send({ message: "Leave request status updated to Rejected and email sent." });
        } catch (error) {
            console.error('Error updating status or sending email:', error.stack);
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