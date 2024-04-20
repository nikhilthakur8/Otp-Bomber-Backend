const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    numberKey: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
    },
    otherFields: {
        type: Object,
    },
    method: {
        type: String,
        enum: ["get", "post"],
        required: true,
    },
});


const URL = mongoose.model("url", urlSchema);

module.exports = URL;
