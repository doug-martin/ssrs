var ssrs = require("../index"),
    helper = require("./helper.js");


var server = ssrs.server(helper.getCredentials());
var xml = server.xml(helper.getReport());


console.log(xml.url);
xml
    .raw()
    .save(__dirname + "/test.xml").then(function (csv) {
        console.log(csv);
    });

xml.omitSchema(true).forEach(function (data) {
    console.log(JSON.stringify(data))
})
