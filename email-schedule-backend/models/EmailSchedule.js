// const mongoose = require("mongoose");

// const EmailScheduleSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     subject: { type: String, required: true },
//     body: { type: String, required: true },
//     status: { type: String, enum: ["Scheduled", "Sent"], default: "Scheduled" },
//     scheduledAt: { type: Date, required: true },
//     sentAt: { type: Date }
// });

// module.exports = mongoose.model("EmailSchedule", EmailScheduleSchema);

// //compulsory
// const mongoose = require("mongoose");

// const EmailScheduleSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     subject: { type: String, required: true },
//     body: { type: String, required: true },
//     status: { type: String, enum: ["Scheduled", "Sent"], default: "Scheduled" },
//     scheduledAt: { type: Date, required: true },
//     sentAt: { type: Date },
//     leadSource: { 
//         type: String, 
//         enum: ["website", "linkedin", "referrals", "others"],
//         required: true 
//     },
//     waitDelay: {
//         value: { type: Number, required: true },
//         unit: { 
//             type: String, 
//             enum: ["Days", "Hours", "Minutes", "Weeks"],
//             required: true 
//         }
//     }
// });

// module.exports = mongoose.model("EmailSchedule", EmailScheduleSchema);



//optional leadsourse waitdelay
const mongoose = require("mongoose");

const EmailScheduleSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Sent"], default: "Scheduled" },
    scheduledAt: { type: Date, required: true },
    sentAt: { type: Date },
    leadSource: {
        type: String,
        enum: ["website", "linkedin", "referral", "other"],
        required: false  // Changed to false to make it optional
    },
    waitDelay: {
        value: { type: Number, required: false },  // Changed to false
        unit: {
            type: String,
            enum: ["Days", "Hours", "Minutes", "Weeks"],
            required: false  // Changed to false
        }
    }
});

module.exports = mongoose.model("EmailSchedule", EmailScheduleSchema);