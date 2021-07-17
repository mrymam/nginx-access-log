"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const parser_1 = require("../src/parser");
const line = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1";
mocha_1.describe('parser', () => {
    mocha_1.it('oneline', () => {
        const log = parser_1.parse(line)[0];
        chai_1.assert.equal(log.time, new Date("10/Jul/2021:13:37:14 +0000"));
    });
});
