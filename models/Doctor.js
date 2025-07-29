const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
    name:String,
    specialty: String,
    yearsOfExperience: Number
})


const Doctor = mongoose.model("Doctor", doctorSchema)



module.exports = Doctor