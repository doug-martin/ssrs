var Report = require("./report"),
    comb = require("comb");

comb.define(Report, {

    instance:{

        _encoding:"binary",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "EXCEL";
        }
    },

    static:{
        DEFAULT_FIELD_DELIMETER:",",
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("omitDocumentMap omitFormulas simplePageHeaders").split(" ")
    }

}).as(module);