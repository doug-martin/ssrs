var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var html4 = server.html4(helper.getReport());
var html3 = server.html3(helper.getReport());

console.log(html4.url);
console.log(html3.url);
html4.get().then(function (body) {
    console.log(body);
});
html4.save(__dirname + "/test.html4.html").then(function () {
    console.log("SAVED");
});

html3.get().then(function (body) {
    console.log(body);
});
html3.save(__dirname + "/test.html3.html").then(function () {
    console.log("SAVED");
});
