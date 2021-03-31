#!/usr/bin/env node

//Most awesome dirty hack script

let fs = require("fs");
let readline = require("readline");
let result = {de:{}, en:{}, fr:{}, it:{}};

const defaultNs = "translation";
let ignnoreNs = false;
if (process.argv.indexOf("--ignore-ns") >= 0) {
    ignnoreNs = true;
}


console.log("process.argv", process.argv, __dirname);

fs.readFile( process.argv[2], (err, data) => {
    if(err) {
        throw err;
    }
    // console.log(data.toString());

    const rl = readline.createInterface({
        input: fs.createReadStream( process.argv[2] ),
        output: process.stdout,
        console: false
    });


    let line = "";
    let idx = 0;
    let ns = "";
    let entries = [];
    rl.on("line", (input) => {
        line = input.toString();

        if(line.indexOf("<") >= 0) {
            return;
        }

        //ist eine .htm zeile
        idx = line.indexOf(".htm");
        if(idx > 0) {
            ns = line.slice(0, idx);

            if(!result.de[ns]) {
                result.de[ns] = {};
                result.en[ns] = {};
                result.fr[ns] = {};
                result.it[ns] = {};
            }

            //have enough entries for all
            entries = line.split("\t");
            if(entries.length >= 6) {
                if(ignnoreNs) {
                    // Ignoring namespace NS
                    result.de[defaultNs][entries[1]] = entries[4];
                    result.en[defaultNs][entries[1]] = entries[4];
                    result.fr[defaultNs][entries[1]] = entries[5];
                    result.it[defaultNs][entries[1]] = entries[6];
                }
                else {
                    result.de[ns][entries[1]] = entries[4];
                    result.en[ns][entries[1]] = entries[4];
                    result.fr[ns][entries[1]] = entries[5];
                    result.it[ns][entries[1]] = entries[6];
                }
            }
        }
    });

    rl.on("close", () => {
        // console.log("parse result", result);

        fs.writeFile("result.json", JSON.stringify(result), (er) => {
            if(er) {
                throw er;
            }
            console.log("SAVE result file DONE.");
        });
    })


});