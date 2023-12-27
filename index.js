const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

const config = JSON.parse(fs.readFileSync('./config/config.json').toString());

const TestModel = mongoose.model('Test', { name: String });

//listens to the port "3551" (configurable)
const port = 3551;

app.listen(port, () => {
    console.log(`Arcane Backend listening on port ${port}`);
});

async function connectToMongo() {
    try {
        await mongoose.connect(config.mongodb.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const testDocument = new TestModel({ name: 'test' });
        await testDocument.save();

        console.log('The Arcane Backend has successfully connected to MongoDB');
    } catch (mongo) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

connectToMongo();