const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

const config = JSON.parse(fs.readFileSync('./config/config.json').toString());

//listens to the port "3551" (configurable)
const port = 3551;

app.listen(port, () => {
    console.log(`Arcane Backend listening on port ${port}`);
});

async function main() {
    try {
        await mongoose.connect(config.mongodb.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add other options if needed
        });
        console.log('The Arcane Backend has successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

main();