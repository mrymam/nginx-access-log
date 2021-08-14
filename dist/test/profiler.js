"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const profiler_1 = require("../src/profiler");
const baseLog = {
    time: new Date(),
    host: "",
    forwardedfor: "",
    req: "",
    status: 200,
    method: "GET",
    uri: "/a",
    size: 100,
    referer: "",
    ua: "",
    reqtime: 0.1,
    cache: "",
    runtime: "",
    apptime: 0.1,
    vhost: "",
};
mocha_1.describe('filter', () => {
    mocha_1.it('filter method', () => {
        const logs = [
            baseLog,
            baseLog,
            {
                ...baseLog,
                method: "POST",
            }
        ];
        const query = { methods: ["GET"] };
        const query2 = { methods: ["POST"] };
        chai_1.assert.equal(profiler_1.filter(logs, query).length, 2);
        chai_1.assert.equal(profiler_1.filter(logs, query2).length, 1);
    });
});
mocha_1.describe('digest', () => {
    mocha_1.it('count', () => {
        const logs = [
            baseLog,
            {
                ...baseLog,
                status: 300,
            },
            {
                ...baseLog,
                status: 499,
            },
            {
                ...baseLog,
                status: 500,
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests[0].count, 4);
        chai_1.assert.equal(digests[0].count2xx, 1);
        chai_1.assert.equal(digests[0].count3xx, 1);
        chai_1.assert.equal(digests[0].count4xx, 1);
        chai_1.assert.equal(digests[0].count5xx, 1);
    });
    mocha_1.it('reqtime', () => {
        const logs = [
            baseLog,
            {
                ...baseLog,
                reqtime: 0.2,
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests[0].sum, 0.3);
        chai_1.assert.equal(digests[0].average, 0.15);
        chai_1.assert.equal(digests[0].min, 0.1);
        chai_1.assert.equal(digests[0].max, 0.2);
    });
    mocha_1.it('separate by method', () => {
        const logs = [
            baseLog,
            {
                ...baseLog,
                method: "POST"
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests.length, 2);
        chai_1.assert.equal(digests[0].method, "GET");
        chai_1.assert.equal(digests[1].method, "POST");
    });
    mocha_1.it('separate by uri', () => {
        const logs = [
            baseLog,
            {
                ...baseLog,
                uri: "/b"
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests.length, 2);
        chai_1.assert.equal(digests[0].uri, "/a");
        chai_1.assert.equal(digests[1].uri, "/b");
    });
    mocha_1.it('separate by uri and method', () => {
        const logs = [
            {
                ...baseLog,
                uri: "/a",
                method: "GET"
            },
            {
                ...baseLog,
                uri: "/a",
                method: "POST"
            },
            {
                ...baseLog,
                uri: "/b",
                method: "GET"
            },
            {
                ...baseLog,
                uri: "/b",
                method: "POST"
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests.length, 4);
    });
    mocha_1.it('size', () => {
        const logs = [
            {
                ...baseLog,
                size: 100
            },
            {
                ...baseLog,
                size: 300
            }
        ];
        const digests = profiler_1.digest(logs);
        chai_1.assert.equal(digests.length, 1);
        chai_1.assert.equal(digests[0].sumBody, 400);
        chai_1.assert.equal(digests[0].averageBody, 200);
        chai_1.assert.equal(digests[0].minBody, 100);
        chai_1.assert.equal(digests[0].maxBody, 300);
    });
    mocha_1.it('merge uri', () => {
        const logs = [
            {
                ...baseLog,
                uri: "/icons/aa.jpeg"
            },
            {
                ...baseLog,
                uri: "/icons/bb.jpeg"
            }
        ];
        const digests = profiler_1.digest(logs, { uriPatterns: ["/icons"] });
        chai_1.assert.equal(digests.length, 1);
    });
    mocha_1.it('merge uri with regrex', () => {
        const logs = [
            {
                ...baseLog,
                uri: "/teams/1/users"
            },
            {
                ...baseLog,
                uri: "/teams/2/users"
            }
        ];
        const digests = profiler_1.digest(logs, { uriPatterns: ["^/teams/[0-9]+/users"] });
        chai_1.assert.equal(digests.length, 1);
        chai_1.assert.equal(digests[0].uri, "^/teams/[0-9]+/users");
    });
    mocha_1.it('merge 正規表現にマッチしないもの', () => {
        const logs = [
            {
                ...baseLog,
                uri: "/teams/1/users"
            },
            {
                ...baseLog,
                uri: "/teams/2/users"
            }
        ];
        const digests = profiler_1.digest(logs, { uriPatterns: ["^/users"] });
        chai_1.assert.equal(digests.length, 2);
    });
});
