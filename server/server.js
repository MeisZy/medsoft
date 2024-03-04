const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

const port = process.env.PORT || 4069;

app.get("/", (req,res) => {
    res.send({
        onlineMessage: "You are currently online."
    });
})

app.listen(port, () =>
    console.log(`Firm replica app listening on port ${port}`)
    );