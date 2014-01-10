var comb = require("comb"),
    hitch = comb.hitch,
    merge = comb.merge,
    IterablePromise = require("./util/iterablePromise"),
    querystring = require("querystring"),
    URL = require("url"),
    Report = require("./report"),
    Csv = require("./csv"),
    Html4 = require("./html4"),
    Html3 = require("./html3"),
    Image = require("./image"),
    MHTML = require("./mhtml"),
    PDF = require("./pdf"),
    Word = require("./word"),
    Xml = require("./xml"),
    Excel = require("./excel"),
    request = require("request");

comb.define(null, {
    instance:{
        constructor:function (server, options) {
            this.server = server;
            options = options || {};
            this._opts = options;
            this._url = URL.parse(server, false);
            var self = this._static
            self.AUTH_PARAMS.forEach(function (i) {
                this[i] = function (cmd) {
                    return options[i] = cmd;
                };
            }, this);
        },

        auth:function (cmd, val) {
            var opts = this._opts;
            if (comb.isObject(cmd)) {
                merge(opts, cmd);
            } else {
                opts[cmd] = val;
            }
            return this;
        },

        _setAuthHeader:function (headers) {
            var auth = this._opts;
            if (auth) {
                var type = auth.authType;
                if (!type || /basic/i.test(type)) {
                    var userName = auth.username, password = auth.password, domain = auth.domain;
                    if (comb.isDefined(userName) && comb.isDefined(password)) {
                        comb.isDefined(domain) && (userName = [domain, "\\", userName].join(""))
                        headers.authorization = "Basic " + new Buffer([userName, auth.password].join(":")).toString("base64");
                    }
                }
            }
        },

        _getRequest:function (opts) {
            var headers = {};
            this._setAuthHeader(headers);
            var ret = {url:this.url(opts), headers:headers}
            if (opts.encoding) {
                ret.encoding = opts.encoding;
            }
            return ret;
        },

        "get":function (opts) {
            var ret = new IterablePromise();
            request(this._getRequest(opts), hitch(this, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    ret.callback(response, body);
                } else {
                    var err = error || new Error("Request status " + response.statusCode);
                    ret.errback(err);
                }
            }));
            return ret;
        },

        url:function (opts) {
            var url = this._url, queryOpts = opts.query;
            var search = querystring.stringify(queryOpts)
            url.search = ["?/", opts.report + "&" + search].join("");
            return URL.format(url);
        },

        report:function (report, options) {
            return new Report(this, report, options);
        },

        csv:function (report, options) {
            return new Csv(this, report, options);
        },

        excel:function (report, options) {
            return new Excel(this, report, options);
        },

        html4:function (report, options) {
            return new Html4(this, report, options);
        },
        html3:function (report, options) {
            return new Html3(this, report, options);
        },
        image:function (report, options) {
            return new Image(this, report, options);
        },
        mhtml:function (report, options) {
            return new MHTML(this, report, options);
        },
        pdf:function (report, options) {
            return new PDF(this, report, options);
        },
        word:function (report, options) {
            return new Word(this, report, options);
        },
        xml:function (report, options) {
            return new Xml(this, report, options);
        }


    },

    static:{
        AUTH_PARAMS:"type domain username password".split(" ")
    }
}).as(module);