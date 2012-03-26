var comb = require("comb"), hitch = comb.hitch, hitchIgnore = comb.hitchIgnore;

comb.define(null, {
    instance:{

        forEach:function (cb, eb) {
            return this.get().forEach(cb, eb);
        },

        map:function (cb, eb) {
            return this.get().map(cb, eb);
        },

        filter:function (cb, eb) {
            return this.get().filter(cb, eb);
        },

        every:function (cb, eb) {
            return this.get().every(cb, eb);
        },

        some:function (cb, eb) {
            return this.get().some(cb, eb);
        },
        all:function (cb, eb) {
            return this.get().all(cb, eb);
        }

    }
}).as(module);