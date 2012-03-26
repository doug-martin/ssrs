var HTML4 = require("./html4"),
    comb = require("comb");

comb.define(HTML4, {

    instance:{

        constructor:function () {
            this._super(arguments);
            this._opts.rs.format = "HTML3.0";
        }
    }

}).as(module);