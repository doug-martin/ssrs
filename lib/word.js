var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb");

comb.define([Report, Iterable], {

    instance:{

        _encoding:"binary",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "WORD";
        }
    },

    static:{
        DEFAULT_FIELD_DELIMETER:",",
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("autoFit expandToggles fixedPageWidth omitHyperlinks omitDrillThroughs").split(" ")
    }

}).as(module);