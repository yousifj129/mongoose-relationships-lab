const Doctor = require("../models/Doctor")
const Appointment = require("../models/Appointment")
const router = require("express").Router()


router.get("/", async (req,res)=>{
    try {
        const allDoctors = await Doctor.find()

        res.render("doctors/allDoctors.ejs", {allDoctors:allDoctors})
    } catch (error) {
        console.log(error)
    }
})

router.get("/new", async (req,res)=>{
    try {
        res.render("doctors/new.ejs")
    } catch (error) {
        console.log(error)
    }
})


router.post("/", async (req,res)=>{
    try {
        await Doctor.create(req.body)
        res.redirect("/doctors/new")
    } catch (error) {
        console.log(error)
    }
})
router.get("/:id", async (req,res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id)
        const appointments =  await Appointment.find({doctor: req.params.id})
        res.render("doctors/showDoctorDetails.ejs", {doctor:doctor, appointments:appointments})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router