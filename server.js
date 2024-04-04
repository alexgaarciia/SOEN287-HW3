const http = require("http");

function findSummation(n){
    if (!Number.isInteger(n) || n < 1){
        return false;
    }
    return (n*(n+1))/2;
}


const server = http.createServer((req, res) => {

})
