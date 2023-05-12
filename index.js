const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();


app.use(express.json());
app.use(cors());

app.use("/attendance", require("./routes/attendance"));

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Hi from attendance manager backend" });
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.mongo_url, err => {
    if (err)
        console.log(err.message);
    else
        console.log("Database Connected.");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at ${process.env.PORT || 5000}`)
});