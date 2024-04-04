//const http = require("http");

function findSummation(n){
    if (!Number.isInteger(n) || n < 1){
        return false;
    }
    return (n*(n+1))/2;
}

function uppercaseFirstandLast(str){
    let wordsArray = str.split(" ");
    for(let i = 0; i < wordsArray.length; i++){
        wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substr(1);
    }
    return wordsArray.join(" ");
}

function findAverageAndMedian(numbers){

}


/*const server = http.createServer((req, res) => {

})*/
