var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb");

comb.define(Report, {

    instance:{
        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "HTML4.0";
        }
    },

    static:{
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("accessibleTablix actionScript bookmarkID docMap expandContent findString getImage hTMLFragment" +
            " imageConsolidation javaScript linkTarget onlyVisibleStyles outlookCompat parameters prefixId" +
            " replacementRoot resourceStreamRoot section streamRoot styleStream toolbar userAgent zoom").split(" ")
    }

}).as(module);