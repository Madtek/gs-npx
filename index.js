#!/usr/bin/env node

let fs = require("fs");

// console.log("blub");
// console.log("args", arguments);
// console.log("process", process);
console.log("process.argv", process.argv, __dirname);

fs.readFile( process.argv[2], (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data.toString());

    fs.writeFile("result", data, (er, dat) => {
        if(er) {
            throw er;
        }
        console.log("SAVE result file DONE.");
    });
});