var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var word = server.word(helper.getReport());


console.log(word.url);
word.get().then(function (body) {
    console.log(body);
});
word.save(__dirname + "/test.doc").then(function () {
    console.log("SAVED");
});
