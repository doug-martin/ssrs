var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var mhtml = server.mhtml(helper.getReport());


console.log(mhtml.url);
mhtml.get().then(function (body) {
    console.log(body);
});
mhtml.save(__dirname + "/test.mhtml").then(function () {
    console.log("SAVED");
});