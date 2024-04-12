const mongoose = require("mongoose");

function connectToMongoDb(mongoURI) {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB");
    });
}

module.exports = {
    connectToMongoDb,
};
