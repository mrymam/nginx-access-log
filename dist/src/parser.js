"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const types_1 = require("./types");
const ltsv = require("ltsv");
const parseLine = (lineStr) => {
    const obj = ltsv.parseLine(lineStr);
    return {
        time: new Date(obj.time),
        host: obj.host,
        forwardedfor: obj.forwardedfor,
        req: obj.req,
        status: Number(obj.status),
        method: types_1.isMethod(obj.method) ? obj.method : "",
        uri: obj.uri,
        size: Number(obj.size),
        referer: obj.referer,
        ua: obj.ua,
        reqtime: Number(obj.reqtime),
        cache: obj.cache,
        runtime: obj.runtime,
        apptime: Number(obj.apptime),
        vhost: obj.vhost
    };
};
const parse = (data) => {
    const lines = data.split("\n");
    return lines.map(line => {
        return parseLine(line);
    });
};
exports.parse = parse;
