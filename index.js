var reports = require("./lib/index"),
    Server = (exports.Server = reports.Server),
    comb = require("comb"),
    isObject = comb.isObject;


exports.server = function (server, opts) {
    var ret;
    if(isObject(server)){
        ret = new Server(server.server, server.auth);
    }else{
        ret = ret = new Server(server, opts);
    }
    return ret;
};


