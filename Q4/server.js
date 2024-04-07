const fs = require("fs");
const express = require("express");
const bodyParser = require("express").urlencoded({extended: true});

const app = express();
app.use(bodyParser);

const loginFilePath = "./logins.txt";
const petsFilePath = "./availablePetsInformation.txt"; 

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
        fs.appendFile(loginFilePath, `\n${username}:${password}`, err => {
            if (err) {
                console.error(err);
                return res.send("Failed to create account. Please try again.");
            }

            res.send("Account successfully created. You are now ready to login.")
        })
    })
})

app.post("/submit-pet", (req, res) => {
    const {username, password} = req.body;
    fs.readFile(loginFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Server error");
        const users = data.trim().split("\n");
        const validLogin = users.some(user => user === `${username}:${password}`);
        if (validLogin) {
            const { petType, breed, age, gender, getsAlongDogs, getsAlongCats, goodWithChildren, comments, ownerFamilyName, ownerGivenName, ownerEmail } = req.body;
            fs.readFile(petsFilePath, 'utf-8', (err, data) => {
                // Parse existing pets to determine the next ID
                const pets = data ? data.trim().split("\n") : [];
                const nextId = pets.length + 1;
        
                // Make the new pets entry
                const newPet = [
                    nextId,
                    req.body.username,
                    petType,
                    breed,
                    age,
                    gender,
                    getsAlongDogs ? "yes" : "no",
                    getsAlongCats ? "yes" : "no",
                    goodWithChildren ? "yes" : "no",
                    comments,
                    ownerFamilyName,
                    ownerGivenName,
                    ownerEmail
                ].join(":");
        
                // Append the new entry to the file
                fs.appendFile(petsFilePath, `${newPet}\n`, err => {
                    if (err) {
                        console.error(err);
                        return res.send("Failed to submit pet. Please try again.");
                    }        
                    res.send("Pet successfully submitted.");
                });
            }); 
        } else {
            res.send("Login failed. Username or password is incorrect.");
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://locahost:${PORT}`);
});