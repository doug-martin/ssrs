var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var excel = server.excel(helper.getReport());

console.log(excel.url);
excel.get().then(function (body) {
    console.log(body);
});
excel.save(__dirname + "/test.xls").then(function () {
    console.log("SAVED");
});