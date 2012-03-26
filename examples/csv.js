var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var csv = server.csv(helper.getReport());


console.log(csv.url);
csv.raw().save(__dirname + "/test.csv").then(function (csv) {
    console.log(csv);
});

csv.forEach(function (data) {
    console.log(JSON.stringify(data))
});