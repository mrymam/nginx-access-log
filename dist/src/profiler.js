"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digest = exports.filter = void 0;
const filter = (logs, query) => {
    return logs.filter((log) => {
        return query.methods.includes(log.method);
    });
};
exports.filter = filter;
const updateUri = (logs, query = { uriPatterns: [] }) => {
    if (query.uriPatterns.length === 0) {
        return logs;
    }
    return logs.map((log) => {
        for (const uriPattern of query.uriPatterns) {
            if ((new RegExp(uriPattern)).test(log.uri)) {
                log = {
                    ...log,
                    uri: uriPattern
                };
                return log;
            }
        }
        return log;
    });
};
const digest = (logs, query = { uriPatterns: [] }) => {
    logs = updateUri(logs, query);
    const logsHash = logs.reduce((hash, log) => {
        const key = `${log.method}-${log.uri}`;
        if (!hash[key]) {
            hash[key] = [log];
            return hash;
        }
        hash[key].push(log);
        return hash;
    }, {});
    const keys = Object.keys(logsHash);
    return keys.map((key) => {
        const logs = logsHash[key];
        const reqtimes = logs.map((log) => log.reqtime);
        const sum = reqtimes.reduce((sum, reqtime) => sum + reqtime, 0);
        const average = sum / reqtimes.length;
        const count2xx = logs.filter((log) => log.status < 300).length;
        const count3xx = logs.filter((log) => log.status >= 300 && log.status < 400).length;
        const count4xx = logs.filter((log) => log.status >= 400 && log.status < 500).length;
        const count5xx = logs.filter((log) => log.status >= 500).length;
        const bodies = logs.map((log) => log.size);
        const sumBody = bodies.reduce((sum, bodySize) => sum + bodySize, 0);
        const averageBody = sumBody / bodies.length;
        return {
            count: logs.length,
            count2xx,
            count3xx,
            count4xx,
            count5xx,
            min: Math.min(...reqtimes),
            max: Math.max(...reqtimes),
            sum: Math.floor(sum * 1000) / 1000,
            average: Math.floor(average * 1000) / 1000,
            minBody: Math.min(...bodies),
            maxBody: Math.max(...bodies),
            averageBody: Math.floor(averageBody * 1000) / 1000,
            sumBody: Math.floor(sumBody * 1000) / 1000,
            method: logs[0].method,
            uri: logs[0].uri
        };
    });
};
exports.digest = digest;
