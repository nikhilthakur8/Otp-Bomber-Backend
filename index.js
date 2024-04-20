const express = require("express");
const { connectToMongoDb } = require("./service");
const URL = require("./Model/url");
const app = express();
const axios = require("axios");
const cors = require("cors");
const { bomberFunction } = require("./controllers/bomber");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectToMongoDb(process.env.MONGO_URI);
const corsOption = {
    origin: "http://otpbomber.vercel.app",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOption));
app.post("/api/v1/bomb", bomberFunction);



app.post("/api/add/otp-bombing/site", async (req, res) => {
    const { url, mobileNumber, numberKey } = req.body;
    const newUrl = new URL({
        url,
        mobileNumber,
        numberKey,
    });
    await newUrl.save();
    res.json({ message: "OTP Bombing Site Added" });
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
