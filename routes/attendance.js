const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance_store");

// Create a subject
router.post("/create", async (req, res) => {
    const { email, subjectName } = req.body;
    if (!email || !subjectName) {
        res.status(400).send("Email or subject name cannot be empty.");
    }
    else {
        try {
            const response = await Attendance.create({
                email: req.body.email,
                subjectName: req.body.subjectName,
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send(error.message);

        }
    }
});


// Get all subject of a corresponding email id
router.get("/get/:id", async (req, res) => {
    const email = req.params.id;
    if (!email) {
        res.status(400).send("Email connot be empty.")
    } else {
        try {
            const response = await Attendance.find({ email: email });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});


// Attended today's class
router.patch("/attended", async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).send("Id cannot be empty.");
    } else {
        try {
            const current = await Attendance.findById(id);
            const response = await Attendance.findByIdAndUpdate(id, { attended: current.attended + 1, classes: current.classes + 1 }, { new: true, runValidators: true })
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});


// Not attended today's class
router.patch("/notattended", async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).send("Id cannot be empty.");
    } else {
        try {
            const current = await Attendance.findById(id);
            const response = await Attendance.findByIdAndUpdate(id, { classes: current.classes + 1 }, { new: true, runValidators: true })
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});


// Update a subject
router.patch("/update", async (req, res) => {
    const { id, subjectName, attended, classes } = req.body;
    if (!id || !subjectName || !attended || !classes) {
        res.status(400).send("Id, subject name, attended, classes cannot be empty.");
    } else {
        try {
            const response = await Attendance.findByIdAndUpdate(id, { subjectName: subjectName, attended: attended, classes: classes, }, { new: true, runValidators: true });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});


// Delete a subject
router.delete("/delete", async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).send("Id cannot be empty.");
    } else {
        try {
            const response = await Attendance.findByIdAndDelete(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});

module.exports = router;