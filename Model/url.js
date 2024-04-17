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
});

// db.urls.insertOne({url: "https://blinkit.com/v2/accounts/",numberKey: "user_phone",otherHeaders:{Auth_key:"c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477"}});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
