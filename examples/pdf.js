var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var pdf = server.pdf(helper.getReport());


console.log(pdf.url);
pdf.get().then(function (body) {
    console.log(body);
});
pdf.save(__dirname + "/test.pdf").then(function () {
    console.log("SAVED");
});