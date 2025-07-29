const Appointment = require("../models/Appointment")
const Doctor = require("../models/Doctor")
const router = require("express").Router()


router.get("/", async (req, res) => {
    try {
        const allAppointments = await Appointment.find().populate("doctor")

        res.render("appointments/allAppointments.ejs", { allAppointments: allAppointments })
    } catch (error) {
        console.log(error)
    }
})
router.get("/new", async (req, res) => {
    try {
        const doctor = await Doctor.find()

        res.render("appointments/new.ejs", { doctor: doctor })
    } catch (error) {
        console.log(error)
    }
})


router.post("/", async (req, res) => {
    try {
        console.log(req.body)

        await Appointment.create(req.body)
        res.redirect("/appointments/new")
    } catch (error) {
        console.log(error)
    }
})
router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate("doctor")

        res.render("appointments/showAppointmentDetails.ejs", { appointment: appointment })
    } catch (error) {
        console.log(error)
    }
})
router.get("/:id/edit", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
        const doctors = await Doctor.find()

        res.render("appointments/editAppointment.ejs",
            {
                appointment: appointment,
                doctors: doctors
            })
    } catch (error) {
        console.log(error)
    }
})
router.post("/addnote/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)

        appointment.notes.push(req.body)
        console.log(appointment)
        await Appointment.findByIdAndUpdate(req.params.id, appointment)
        res.redirect("/appointments/"+req.params.id)
    } catch (error) {
        console.log(error)
    }
})
router.get("/deletenote/:appointmentId/:noteId", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.appointmentId)

        appointment.notes.forEach((elem)=>{
            if(elem._id == req.params.noteId){
                const index = appointment.notes.indexOf(elem)
                appointment.notes.splice(index, 1);
            }
        })
        console.log(appointment)
        await Appointment.findByIdAndUpdate(req.params.appointmentId, appointment)
        res.redirect("/appointments/"+req.params.appointmentId)
    } catch (error) {
        console.log(error)
    }
})
router.put("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/appointments")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id)
        res.redirect("/appointments")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router