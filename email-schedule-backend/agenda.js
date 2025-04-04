
const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const EmailSchedule = require("./models/EmailSchedule");

// Connect to MongoDB
const mongoConnectionString = process.env.MONGO_URI + "&tlsAllowInvalidCertificates=true";

const agenda = new Agenda({
    db: {
        address: mongoConnectionString,
        options: { tls: true }  
    }
});

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Define the job to send email
agenda.define("send scheduled email", async (job) => {
    const { emailId } = job.attrs.data;
    const emailRecord = await EmailSchedule.findById(emailId);
    
    if (!emailRecord) return;
    
    try {
        // Start with the base email text
        let emailText = emailRecord.body;
        
        // Optional: Add source tracking or custom footer based on leadSource if it exists
        if (emailRecord.leadSource) {
            emailText += `\n\nYou received this email because you signed up through our ${emailRecord.leadSource}.`;
        }
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailRecord.email,
            subject: emailRecord.subject,
            text: emailText
        });
        
        // Update status after email is sent
        emailRecord.status = "Sent";
        emailRecord.sentAt = new Date();
        await emailRecord.save();
        
        // Log with waitDelay information if it exists
        let logMessage = `Email sent to ${emailRecord.email}`;
        
        if (emailRecord.leadSource) {
            logMessage += ` (Lead Source: ${emailRecord.leadSource}`;
        }
        
        if (emailRecord.waitDelay && emailRecord.waitDelay.value && emailRecord.waitDelay.unit) {
            const waitDelayInfo = `${emailRecord.waitDelay.value} ${emailRecord.waitDelay.unit}`;
            logMessage += emailRecord.leadSource ? `, Wait Delay: ${waitDelayInfo}` : ` (Wait Delay: ${waitDelayInfo}`;
        }
        
        if (emailRecord.leadSource || (emailRecord.waitDelay && emailRecord.waitDelay.value && emailRecord.waitDelay.unit)) {
            logMessage += ")";
        }
        
        console.log(logMessage);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
});

// Start agenda
(async function () {
    await agenda.start();
    console.log("Agenda started");
})();

module.exports = agenda;
