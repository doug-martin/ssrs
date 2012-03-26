var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb"),
    hitch = comb.hitch,
    parser = require('xml2json');

comb.define([Report, Iterable], {

    instance:{

        _encoding:"utf8",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "XML";
        },

        encoding : function(encoding){
            this.rc("encoding", encoding);
        },

        raw:function () {
            return this._merge({raw:true});
        },

        rowCb:function (cb) {
            return this._merge({rowCb:cb});
        },

        _handleResponse:function (response, body) {
            var opts = this._opts, ret = new comb.Promise(), retObj = [];
            if (!opts.raw) {
                var json = parser.toJson(body, {object : true}), rowCb = opts.rowCb;
                if(json.Report){
                    json = json.Report;
                }
                if (comb.isFunction(rowCb)) {
                    var keys = Object.keys(json), l = keys.length;
                    (function next(i) {
                        if (i < l) {
                            var key = keys[i];
                            comb.when(rowCb(json[key]), function (res) {
                                if (res) {
                                    json[key] = res;
                                }
                                next(++i);
                            }, hitch(ret, "errback"));
                        } else {
                            ret.callback(json);
                        }
                    })(0);
                    return ret;
                } else {
                    return json;
                }
            } else {
                return body;
            }
        }
    },

    static:{
        DEFAULT_FIELD_DELIMETER:",",
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("xslt mimeType useFormattedValues indented omitSchema schema").split(" ")
    }

}).as(module);