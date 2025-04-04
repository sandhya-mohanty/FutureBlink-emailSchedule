
const EmailSchedule = require("../models/EmailSchedule");
const agenda = require("../agenda");

// Schedule Email Controller
const scheduleEmail = async (req, res) => {
    try {
        const { email, subject, body, leadSource, waitDelay } = req.body;
        
        // Get current time
        const currentTime = new Date();
        
        // Calculate scheduledAt based on waitDelay if provided, otherwise use default
        let scheduledAt = new Date(currentTime);
        let waitDelayInfo = "No delay";
        
        if (waitDelay && waitDelay.value && waitDelay.unit) {
            const { value, unit } = waitDelay;
            
            switch(unit) {
                case "Minutes":
                    scheduledAt = new Date(scheduledAt.getTime() + value * 60 * 1000);
                    break;
                case "Hours":
                    scheduledAt = new Date(scheduledAt.getTime() + value * 60 * 60 * 1000);
                    break;
                case "Days":
                    scheduledAt = new Date(scheduledAt.getTime() + value * 24 * 60 * 60 * 1000);
                    break;
                case "Weeks":
                    scheduledAt = new Date(scheduledAt.getTime() + value * 7 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    scheduledAt = new Date(scheduledAt.getTime() + 60 * 60 * 1000); // Default 1 hour
            }
            waitDelayInfo = `${value} ${unit}`;
        }
        
        // Format times for display with full date and time
        const currentTimeFormatted = currentTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        
        const scheduledAtFormatted = scheduledAt.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        
        // Create email schedule object with only required fields
        const emailScheduleData = {
            email,
            subject,
            body,
            scheduledAt
        };
        
        // Add optional fields if they exist
        if (leadSource) {
            emailScheduleData.leadSource = leadSource;
        }
        
        if (waitDelay && waitDelay.value && waitDelay.unit) {
            emailScheduleData.waitDelay = waitDelay;
        }
        
        // Save to database
        const emailSchedule = new EmailSchedule(emailScheduleData);
        
        await emailSchedule.save();
        
        // Schedule the job in Agenda
        await agenda.schedule(scheduledAt, "send scheduled email", { emailId: emailSchedule._id });
        
        res.status(200).json({
            message: "Email scheduled successfully",
            emailSchedule,
            timing: {
                currentTime: currentTimeFormatted,
                scheduledAt: scheduledAtFormatted,
                waitDelay: waitDelayInfo
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = { scheduleEmail };