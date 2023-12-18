const express = require('express')
const mongoose = require("mongoose")
const fs = require("fs")
const config = JSON.parse(fs.readFileSync("./config/config.json").toString())
const app = express()
const log = require("./structures/log.js");

//should create a http server with port "3551"
const port = 3551

// lets the backend connect to the database
mongoose.connect(config.mongodb.database, () => {
    log.database("Arcane Backend has successfully connected to MongoDB.");
});

mongoose.connection.on("error", err => {
    log.error("MongoDB failed to connect, please make sure you have MongoDB installed and running.");
    throw err;
})

app.listen(port, () => {
    log.backend(`Arcane Backend listening on port ${port}`);


    require("./bot");
}).on("error", async (err) => {
    if (err.code == "EADDRINUSE") {
        log.error(`Port ${PORT} is already in use!\nClosing in 3 seconds...`);
        await functions.sleep(3000)
        process.exit(0);
    } else throw err;
});
