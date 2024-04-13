const mongoose = require("mongoose");

async function connectToMongoDb(mongoURI) {
    await mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB");
    });
}

module.exports = {
    connectToMongoDb,
};
