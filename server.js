//const http = require("http");

function findSummation(n){
    if (!Number.isInteger(n) || n < 1){
        return false;
    }
    return (n*(n+1))/2;
}

function uppercaseFirstandLast(str){
    let wordsArray = str.split(" ");
    for (let i = 0; i < wordsArray.length; i++){
        wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substr(1);
    }
    return wordsArray.join(" ");
}

function findAverageAndMedian(numbers){
    // Calculage the average
    let sum = 0;
    for (let i = 0; i < numbers.length; i++){
        sum += numbers[i];
    }
    let avg = sum / numbers.length;

    // Calculate the median
    let median = 0;
    numbers.sort((a, b) => a - b);
    const middleIndex = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        median = (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
    } else {
        median = numbers[middleIndex];
    }
    return avg, median;
}

function find4Digits(str_numbers){
    
}


/*const server = http.createServer((req, res) => {

})*/
