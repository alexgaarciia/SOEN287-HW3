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