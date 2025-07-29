const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    content: String,
    createdAt: {
        type:Date,
        default: Date.now
    }
}, {timestamps: true})

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    date: Date,
    reason: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    notes: [notesSchema]
})


const Appointment  = mongoose.model("Appointment", appointmentSchema)


module.exports = Appointment 