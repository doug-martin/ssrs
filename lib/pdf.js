var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb");

comb.define(Report, {

    instance:{

        _encoding:"binary",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "PDF";
        }
    },

    static:{
        DEFAULT_FIELD_DELIMETER:",",
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("colorDepth columns columnSpacing dpiX dpiY endPage humalReadablePDF marginBottom marginLeft marginRight marginTop" +
            " pageHeight pageWidth startPage").split(" ")
    }

}).as(module);