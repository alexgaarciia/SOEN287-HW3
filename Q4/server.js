const fs = require("fs");
const express = require("express");
const bodyParser = require("express").urlencoded({enteded: true});

const app = express();
app.use(bodyParser);

const loginFilePath = "./logins.txt";

app.post("/create-account", (req, res) => {
    const {username, pswrd: password} = req.body;
    const usernameRegex = /^[A-Za-z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.send("Username or password format is incorrect.")

    }

    // Check if username already exists
    fs.readFile(loginFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.send("An error occurred. Please try again.");
        }

        const users = data.split("\n");
        const exists = users.some(user => user.split(":")[0] === username);

        if (exists) {
            return res.send('This username is not available. Please choose another.');
        }

        // Add new user
        fs.appendFile(loginFilePath, `${username}:${password}`, err => {
            if (err) {
                console.error(err);
                return res.send("Failed to create account. Please try again.");
            }

            res.send("Account successfully created. You are now ready to login.")
        })
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://locahost:${PORT}`);
});