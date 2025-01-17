const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Q3.html");
});

// Handle form submission
app.post("/validate-phone", (req, res) => {
    let name = req.body.name;
    const phone = req.body.phone;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!name) {
        name = "Guest";
    }

    if (phoneRegex.test(phone)) {
        res.send(`Hello, ${name}. Your phone number is correctly formatted.`);
    } else {
        res.send(`Hello, ${name}. The phone number you entered does not match the required format (ddd-ddd-dddd).`);
    }
});

const PORT = 5249;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));