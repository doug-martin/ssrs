var Report = require("./report"),
    comb = require("comb");

comb.define(Report, {

    instance:{

        _encoding:"binary",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "IMAGE";
        }
    },

    static:{
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("outputFormat colorDepth columns columnSpacing dpiX dpiY endPage marginBottom marginLeft marginRight marginTop outputFormat" +
            " pageHeight pageWidth startPage").split(" ")
    }

}).as(module);