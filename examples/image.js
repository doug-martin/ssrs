var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var jpg = server.image(helper.getReport()).outputFormat("JPEG").startPage(0);


console.log(jpg.url);
jpg.save(__dirname + "/test.jpg").then(function (csv) {
    console.log(csv);
});