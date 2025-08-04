const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

const port = process.env.PORT || 4068;

app.get("/", (req,res) => {
    res.send({
        onlineMessage: "You are currently online."
    });
})

app.listen(port, () =>
    console.log(`Medsoft express server now running on port ${port}`)
    );