var comb = require("comb"),
    Promise = comb.Promise,
    isArray = comb.isArray,
    hitch = comb.hitch,
    partial = comb.partial,
    hitchIgnore = comb.hitchIgnore;

comb.define(Promise, {
    instance:{
        forEach:function (cb, errback) {
            var ret = new this._static();
            this.addErrback(ret);
            this.addCallback(function (res) {
                if (isArray(res)) {
                    var l = res.length;
                    (function next(i) {
                        if (i < l) {
                            comb.when(cb(res[i], i, res)).then(function () {
                                process.nextTick(partial(next, ++i));
                            }, ret);
                        } else {
                            ret.callback(res);
                        }
                    })(0);
                } else {
                    comb.when(cb(res), 0, [res]).then(hitchIgnore(ret, "callback", res), ret);
                }
            });
            ret.addErrback(errback);
            return ret;
        },

        map:function (cb, eb) {
            var retArr = [], ret = new this._static();
            this.forEach(
                function (item, i, res) {
                    var ret = new comb.Promise();
                    comb.when(cb(item, res, i), function (res) {
                        retArr[i] = res;
                        ret.callback();
                    }, hitch(ret, "errback"));
                    return ret;
                }, eb).then(function () {
                    ret.callback(retArr);
                }, ret);
            this.addErrback(ret);
            ret.addErrback(eb);
            return ret;
        },

        filter:function (cb, eb) {
            var retArr = [], ret = new this._static();
            this.forEach(
                function (item, i, res) {
                    var ret = new comb.Promise();
                    comb.when(cb(item, res, i), function (res) {
                        if (res) {
                            retArr.push(item);
                        }
                        ret.callback();
                    });
                    return ret;
                }, eb).then(hitchIgnore(ret, "callback", retArr), hitch(ret, "errback"));
            this.addErrback(ret);
            ret.addErrback(eb);
            return ret;
        },

        every:function (cb, eb) {
            var ret = new this._static();
            this.addCallback(function (res) {
                var l = res.length;
                (function next(i) {
                    if (i < l) {
                        comb.when(cb(res[i], i, res), function (res) {
                            if (res) {
                                next(i++);
                            } else {
                                ret.callback(false);
                            }
                        }, ret);
                    } else {
                        ret.callback(true);
                    }

                })(0);
            });
            this.addErrback(ret);
            ret.addErrback(eb);
            return ret;
        },

        some:function (cb, eb) {
            var ret = new this._static();
            this.addCallback(function (res) {
                var l = res.length;
                (function next(i) {
                    if (i < l) {
                        comb.when(cb(res[i], i, res), function (res) {
                            if (res) {
                                next(i++);
                            } else {
                                ret.callback(false);
                            }
                        }, ret);
                    } else {
                        ret.callback(true);
                    }

                })(0);
            });
            ret.addErrback(eb);
            return ret;
        },


        all:function (cb, eb) {
            return this.then(cb, eb);

        }
    }
}).as(module);