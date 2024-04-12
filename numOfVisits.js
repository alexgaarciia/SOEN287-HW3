const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;
    let lastVisit = req.cookies.lastVisit || "This is your first visit.";

    // Update visits count
    visits++;

    // Save the current visit date and time
    const now = new Date();
    const dateString = now.toDateString();
    const timeString = now.toTimeString().split(" ")[0];
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDateTime = `${dateString} ${timeString} ${timeZone}`;

    // Set cookies: "visits" for number of viists, "lastVisit" for last visit date/time
    res.cookie("visits", visits, { maxAge: 900000, httpOnly: true });
    res.cookie('lastVisit', formattedDateTime, { maxAge: 900000, httpOnly: true });

    if (visits === 1) {
        res.send("Welcome to my webpage! It is your first time that your are here.");
    } else {
        res.send(`Hello, this is the <b>${visits}</b> time that you are visiting my webpage. <br> Last time you visited my webpage on: ${lastVisit}`);
    }
});

const PORT = 5249;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));