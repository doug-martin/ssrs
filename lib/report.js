var comb = require("comb"),
    merge = comb.merge,
    hitch = comb.hitch,
    fs = require("fs"),
    IterablePromise = require("./util/iterablePromise");

comb.define(null, {

    instance:{

        url:null,

        _encoding:"utf8",

        constructor:function (server, report, options) {
            this._results = null;
            options = options || {};
            this.server = server;
            this._opts = options;
            this.report = report;
            !options.rs && (options.rs = {command:"Render"});
            !options.rc && (options.rc = {});
            !options.auth && (options.auth = {type:"basic"});
            var self = this._static
            self.RS_PARAMS.forEach(function (i) {
                this[i] = function (cmd) {
                    return this.rs(i, cmd);
                };
            }, this)
            self.RC_PARAMS.forEach(function (i) {
                this[i] = function (cmd) {
                    return this.rc(i, cmd);
                };
            }, this)
        },

        _merge:function (type, options) {
            var ret = {};
            if (comb.isObject(type)) {
                merge(ret, this._opts, type);
            } else {
                merge(ret, this._opts);
                ret[type] = merge(ret[type], options);
            }
            return new this._static(this.server, this.report, ret);
        },

        report:function (report) {
            return this._merge({report:report});
        },

        rs:function (cmd, val) {
            return this.__option("rs", cmd, val);
        },

        rc:function (cmd, val) {
            return this.__option("rc", cmd, val);
        },

        query:function (key, value) {
            if (comb.isObject(key)) {
                this._merge("query", key);
            } else {
                return this.__option("query", key, value);
            }
            return this.merge("query")
        },

        __option:function (type, cmd, val) {
            var opts = {};
            opts[cmd] = val;
            return this._merge(type, opts);
        },

        _handleResponse:function (response, body) {
            if (this._encoding === "binary") {
                return new Buffer(body, "binary");
            } else {
                return body;
            }
        },

        _getQueryOptions:function () {
            var opts = this._opts, queryOpts = {}, query = opts.query;
            ["rs", "rc"].forEach(function (type) {
                var typeOpts = opts[type];
                for (var i in typeOpts) {
                    var properName = i.charAt(0).toUpperCase() + i.substr(1);
                    var funcName = "_get" + properName + "Query", f = this[funcName];
                    if (comb.isFunction(f, typeOpts[i])) {
                        f(queryOpts);
                    } else {
                        queryOpts[type + ":" + properName] = typeOpts[i];
                    }
                }
            }, this);
            for (var i in query) {
                queryOpts[i] = query[i];
            }
            return {query:queryOpts, report:this.report, encoding:this._encoding};
        },

        "get":function (cb) {
            var ret = new IterablePromise();
            this.server.get(this._getQueryOptions()).then(hitch(this, function (response, body) {
                comb.when(this._handleResponse(response, body), function (returnObj) {
                    ret.callback(returnObj, response, body);
                    cb && cb(null, returnObj, body, response);
                }, hitch(ret, "errback"));
            }), function (err) {
                ret.errback(err);
                cb && cb(err);
            });
            return ret;
        },

        _getSaveableResults:function (obj) {
            if (Buffer.isBuffer(obj)) {
                return obj;
            } else if (comb.isObject(obj)) {
                return JSON.stringify(obj);
            } else {
                return obj.toString();
            }
        },

        save:function (path, cb) {
            var ret = new IterablePromise();
            this.get().then(hitch(this, function (results, response, body) {
                fs.writeFile(path, this._getSaveableResults(results), function (err) {
                    if (err) {
                        ret.errback(err);
                        cb(err);
                    } else {
                        ret.callback(results, response, body);
                        cb && cb(null, results, body, response);
                    }
                })
            }), function (err) {
                ret.errback(err);
                cb && cb(err);
            })
            return ret;
        },

        getters:{
            url:function () {
                return this.server.url(this._getQueryOptions());
            }
        }

    },

    static:{
        formats:{
            HTML3:"HTML3.2",
            HTML4:"HTML4.0",
            MHTML:"MHTML",
            IMAGE:"IMAGE",
            EXCEL:"EXCEL",
            WORD:"WORD",
            CSV:"CSV",
            PDF:"PDF",
            XML:"XML",
            NULL:"NULL"
        },

        RS_PARAMS:"command format parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("dataFeed encoding excelMode fieldDelimiter noHeader qualifier recordDelimiter" +
            " suppressLineBreaks useFormattedValues omitDocumentMap omitFormulas simplePageHeaders autoFit expandToggles" +
            " fixedPageWidth omitHyperlinks omitDrillThroughs accessibleTablix actionScript bookmarkID docMap expandContent" +
            " findString getImage hTMLFragment imageConsolidation javaScript linkTarget onlyVisibleStyles outlookCompat" +
            " parameters prefixId replacementRoot resourceStreamRoot section streamRoot styleStream toolbar userAgent zoom" +
            " colorDepth columns columnSpacing dpiX dpiY endPage marginBottom marginLeft marginRight marginTop outputFormat" +
            " pageHeight pageWidth startPage mhtmlFragment endPage humanReadablePDF xslt mimeType useFormattedValues indented" +
            " omitSchema encoding schema").split(" ")
    }

}).as(module);




