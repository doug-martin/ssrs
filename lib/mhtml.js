var Report = require("./report"),
    Iterable = require("./interate"),
    comb = require("comb");

comb.define(Report, {

    instance:{

        _encoding:"utf8",

        constructor:function () {
            this._super(arguments);
            var opts = this._opts;
            opts.rs.format = "MTHML";
        },

        _getMhtmlFragmentQuery : function(queryOptions, val){
             queryOptions["MHTML Framgent"] = val;
        }
    },

    static:{
        RS_PARAMS:"command parameterLanguage snapshot persistStreams getNextStream".split(" "),
        RC_PARAMS:("javascript outlookCompat mthmlLFragment").split(" ")
    }

}).as(module);