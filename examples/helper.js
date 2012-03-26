var args = process.argv.slice(2);

var SERVER = process.env.SSRS_SERVER;
var DOMAIN = process.env.SSRS_DOMAIN;
var USER = process.env.SSRS_USER;
var PASSWORD = process.env.SSRS_PASSWORD;
var REPORT = process.env.REPORT;

if (args.length) {
    SERVER = args[0];
    DOMAIN = args[1];
    USER = args[2];
    PASSWORD = args[3];
    REPORT = args[4];
}

exports.getCredentials = function () {
    return {server:SERVER, auth:{domain:DOMAIN, username:USER, password:PASSWORD}};
};

exports.getReport = function () {
    return REPORT;
}