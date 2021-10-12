// Imports
const express = require("express");
const app = express();
const csv = require("csvtojson");

// Path to CSV
const filePath = "Poornima College of Engineering - Jaipur [10 Oct].csv";

app.get('/', (req, res) => {
        var responseObj = {
            "gold": [],
            "silver": [],
            "bronze": [],
            "unranked": []
        };
        csv().fromFile(filePath).then((jsonObj) => {
            jsonObj.forEach(obj => {
                var numTrack1Badges = parseInt(obj['# of Skill Badges Completed in Track 1']);
                var numTrack2Badges = parseInt(obj['# of Skill Badges Completed in Track 2']);
                if (numTrack1Badges == 6 && numTrack2Badges == 6) {
                    responseObj.gold.push(obj);
                } else if ((numTrack1Badges == 6 && numTrack2Badges != 6) || (numTrack1Badges != 6 && numTrack2Badges == 6)) {
                    responseObj.silver.push(obj);
                } else if ((numTrack1Badges != 6 && numTrack1Badges != 0) && (numTrack2Badges != 6 && numTrack2Badges != 0)) {
                    responseObj.bronze.push(obj);
                } else {
                    responseObj.unranked.push(obj)
                }
            })
            res.send({ responseObj, goldLen: responseObj.gold.length, silverLen: responseObj.silver.length, bronzeLen: responseObj.bronze.length, unrankedLen: responseObj.unranked.length });
        });
    })
    // Listen to Server
const PORT = 4000;
app.listen(PORT, () => console.log(`server on ${PORT}...`));