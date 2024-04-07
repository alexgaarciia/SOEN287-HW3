function displayTime(){
    let result = ""
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemebr', 'December'];
    let currentTime = new Date();
    let day = currentTime.getDate(); 
    let month = months[currentTime.getMonth()]; 
    let year = currentTime.getFullYear();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    // Format the time component to have two digits
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Display the result
    result += "Date: " +`${month} ${day}, ${year}` + "<br>";
    result += "Time: " + `${hour}:${minutes}:${seconds}`
    document.getElementById("datetime").innerHTML = result;
}

// Set up the displayTime function to run every 1000 milliseconds (1 second)
setInterval(displayTime, 1000);


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    form.onsubmit = function(e) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('pswrd').value;

        // Regular expression for validating username (letters and digits only)
        const usernameRegex = /^[A-Za-z0-9]+$/;
        
        // Regular expression for validating password (at least 4 characters, at least one letter, and at least one digit)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

        if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
            alert('Username or password format is incorrect. Usernames can contain letters and digits only. Passwords must be at least 4 characters long, contain at least one letter, and at least one digit.');
            e.preventDefault(); // Prevent form from submitting
        }
    };
});
