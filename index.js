const express = require('express')
const mongoose = require("mongoose")
const fs = require("fs")
const app = express()

const log = require("./structures/log.js");
const config = JSON.parse(fs.readFileSync("./config/config.json").toString())

//should create a http server with port "3551"
//creating http server does not currently work
const port = 3551

// lets the backend connect to the database
mongoose.connect(config.mongodb.database, () => {
    log.database("Arcane Backend has successfully connected to MongoDB.");
});

app.listen(port, () => {
    log.backend(`Arcane Backend listening on port ${port}`)
})
