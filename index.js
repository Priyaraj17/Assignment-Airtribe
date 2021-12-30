require("./db");
const { saveDataToCSV } = require("./controller/saveQuestions");
const { crawler } = require("./controller/crawler");

crawler();
