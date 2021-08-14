"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const types_1 = require("./types");
const ltsv = require("ltsv");
const nginxTimeString2Date = (timeStr) => {
    const res = timeStr.split(":");
    if (res.length < 4) {
        return new Date();
    }
    // const [date, hours, minutes, seconds_timelag]: [string, string, string, string] = res
    // return new Date(`${date} ${hours}:${minutes}:${seconds_timelag}`)
    return new Date(`${res[0]} ${res[1]}:${res[2]}:${res[3]}`);
};
const parseLine = (lineStr) => {
    const obj = ltsv.parseLine(lineStr);
    return {
        time: nginxTimeString2Date(obj.time),
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
    return lines.filter(line => {
        return line.indexOf(':') >= 0;
    }).map(line => {
        return parseLine(line);
    });
};
exports.parse = parse;
