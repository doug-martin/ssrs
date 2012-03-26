var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var report = server.report(helper.getReport()).format("CSV");


console.log(report.url);
report.get().then(function (body) {
    console.log(body);
});
report.save(__dirname + "/test.csv").then(function () {
    console.log("SAVED");
});
