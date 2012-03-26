var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb"),
    csv = require("csv"),
    hitch = comb.hitch,
    merge = comb.merge;

comb.define([Report, Iterable], {

    instance:{

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "CSV";

            !opts.csvOpts && (opts.csvOpts = {columns:true, delimeter:this._static.DEFAULT_FIELD_DELIMETER});
        },

        fieldDelimeter:function (fieldDelimiter) {
            this.rc("fieldDelimiter", fieldDelimiter);
            this._opts.csvOpts.delimeter = fieldDelimiter;
        },

        encoding : function(encoding){
            this.rc("encoding", encoding);
        },

        noHeader:function (noHeader) {
            this.rc("noHeader", noHeader);
            this._opts.csvOpts.columns = noHeader;
        },

        qualifier:function (qualifier) {
            this.rc("qualifier", qualifier);
            this._opts.csvOpts.escape = qualifier;
        },

        rowCb:function (cb) {
            return this._merge({rowCb:cb});
        },

        opts:function (opts) {
            return this._merge(merge({delimeter:this._static.DEFAULT_FIELD_DELIMETER}, opts));
        },

        raw:function () {
            return this._merge({raw:true});
        },

        _handleResponse:function (response, body) {
            var opts = this._opts, ret = new comb.Promise(), retObj = [];
            if (!opts.raw) {
                var csvParse = csv().from(body, opts.csvOpts || {});
                var transform = opts.rowCb || function (data) {
                    return data;
                };
                csvParse.transform(transform)
                    .on('data', function (data, index) {
                        retObj.push(data);
                    })
                    .on('end', function (count) {
                        ret.callback(retObj);
                    })
                    .on('error', function (error) {
                        ret.errback(error);
                    });
                return ret;
            } else {
                return body;
            }
        }

    },

    static:{
        DEFAULT_FIELD_DELIMETER:",",
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("excelMode recordDelimiter suppressLineBreaks useFormattedValues").split(" ")
    }

}).as(module);