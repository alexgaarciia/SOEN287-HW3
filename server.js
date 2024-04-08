const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

function findSummation(n){
    let num = parseInt(n);
    if (!Number.isInteger(num) || num < 1){
        return false;
    }
    return (num*(num+1))/2;
}

function uppercaseFirstandLast(str) {
    return str.split(' ').map(word => {
        if (word.length > 1) {
            return word.charAt(0).toUpperCase() + word.substring(1, word.length - 1) + word.charAt(word.length - 1).toUpperCase();
        } else {
            return word.toUpperCase();
        }
    }).join(' ');
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
    return {avg, median};
}

function find4Digits(str_numbers) {
    let numbersArray = str_numbers.split(" ");
    for (let number of numbersArray) {
        if (number.length === 4 && !isNaN(number)) {
            return number;
        }
    }
    return false;
}

// Express Routes for Function Calls
app.get('/findSummation', (req, res) => {
    const n = req.query.n; 
    res.send({ result: findSummation(n) });
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const { text } = req.body;
    res.send({ result: uppercaseFirstandLast(text) });
});

app.post('/findAverageAndMedian', (req, res) => {
    const { numbers } = req.body;
    res.send(findAverageAndMedian(numbers));
});

app.get('/find4Digits', (req, res) => {
    const str_numbers = req.query.str_numbers; 
    res.send({ result: find4Digits(str_numbers) });
});

// Starting the Server
const PORT = 5250;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));