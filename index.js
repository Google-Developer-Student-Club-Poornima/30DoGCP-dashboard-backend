// Imports
const express = require("express");
const app = express();
const fs = require("fs");
const rl = require("readline");
// Read CSV
const reader = rl.createInterface({
    input: fs.createReadStream("Poornima College of Engineering - Jaipur [09 Oct].csv")
});

// Convert CSV to Array
const output = [];
reader.on("line", (row) => {
    output.push(row.split('"').join('').split(","));
})
reader.on("close", () => {
    console.log("done");
})

// Use EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express Routes
app.get('/', function(req, res) {
    res.render("index", { data: output });
});

// Listen to Server
const PORT = 4000;
app.listen(PORT, () => console.log(`server on ${PORT}...`));