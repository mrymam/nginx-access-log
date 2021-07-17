"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const index_1 = require("../src/index");
const chai_1 = require("chai");
mocha_1.describe('hi', () => {
    mocha_1.it('Hello Taro', () => {
        chai_1.assert.equal(index_1.default('Taro'), "Hello Taro");
    });
});
