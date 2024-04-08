// Install modules and/or framworks:
const express = require("express"); // Express framework to simplify web server creation
const bodyParser = require("express").urlencoded({extended: true}); // To parse form data sent through HTTP POST requests
const fs = require("fs"); // File System module to work with the file system on the computer
const path = require('path'); // Path module to work with file and directory paths


// Create an Express application:
const app = express();
app.use(
    bodyParser, 
    express.static("public"),
	express.urlencoded({
		extended: true,
  }));


//Set the view engine to ejs and set the directory where the view templates are stored
app.set("view-engine", "ejs")
app.set('views', path.join(__dirname, 'views'));


// Define paths to the files that store login information and information about pets:
const loginFilePath = "./logins.txt";
const petsFilePath = "./availablePetsInformation.txt"; 




/*DEFINITION OF GET and POST METHODS */
// Define a route handler for the root URL ("/") to serve the home.html file
app.get('/', (req, res) => {
    res.render('homepage.ejs'); 
});

app.get('/home', (req, res) => {
    res.render('homepage.ejs', { title: 'Dog Care' }); 
});

app.get('/find', (req, res) => {
    res.render('find.ejs', { title: 'Adopt an animal' }); 
});

app.get('/dog-care', (req, res) => {
    res.render('dog_care.ejs', { title: 'Dog Care' }); 
});

app.get('/cat-care', (req, res) => {
    res.render('cat_care.ejs', { title: 'Dog Care' }); 
});

app.get('/give-away', (req, res) => {
    res.render('give_away.ejs', { title: 'Give away' });

});app.get('/account', (req, res) => {
    res.render('account.ejs', { title: 'Account' }); 

});app.get('/contact', (req, res) => {
    res.render('contact.ejs', { title: 'Contact' }); 
});


// Define a route handler for POST requests to "/create-account"
app.post("/create-account", (req, res) => {
    const {username, pswrd: password} = req.body;
    const usernameRegex = /^[A-Za-z0-9]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.send(`
        Username or password format is incorrect.
        <br><br>
        <button onclick="location.href='/account.html'">Go Back</button>`)

    }

    // Check if username already exists
    fs.readFile(loginFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.send(`
            An error occurred. Please try again.
            <br><br>
            <button onclick="location.href='/account.html'">Go Back</button>`);
        }

        const users = data.split("\n");
        const exists = users.some(user => user.split(":")[0] === username);

        if (exists) {
            return res.send(`
            This username is not available. Please choose another.
            <br><br>
            <button onclick="location.href='/account.html'">Go Back</button>`);
        }

        // Add new user
        fs.appendFile(loginFilePath, `\n${username}:${password}`, err => {
            if (err) {
                console.error(err);
                return res.send(`
                Failed to create account. Please try again.
                <br><br>
                <button onclick="location.href='/account.html'">Go Back</button>`);
            }

            res.send(`
            Account successfully created. You are now ready to login.
            <br><br>
            <button onclick="location.href='/account.html'">Go Back</button>`)
        })
    })
})

// Define a route handler for POST requests to "/submit-pet"
app.post("/submit-pet", (req, res) => {
    const {username, password} = req.body;
    fs.readFile(loginFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(`
        Server error
        <br><br>
        <button onclick="location.href='/give_away.html'">Go Back</button>`);
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
                        return res.send(`
                        Failed to submit pet. Please try again.
                        <br><br>
                        <button onclick="location.href='/give_away.html'">Go Back</button>`);
                    }        
                    res.send(`
                    Pet successfully submitted.
                    <br><br>
                    <button onclick="location.href='/give_away.html'">Go Back</button>`);
                });
            }); 
        } else {
            res.send(`
            Login failed. Username or password is incorrect.
            <br><br>
            <button onclick="location.href='/give_away.html'">Go Back</button>`);
        }
    });
});




// Start listening for requests on the specified port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});