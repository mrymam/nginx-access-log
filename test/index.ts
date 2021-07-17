import { describe, it } from "mocha";
import hi from '../src/index';
import { assert } from "chai"

describe('hi', () => {
  it('Hello Taro', () => {
    assert.equal(hi('Taro'), "Hello Taro");
  });
})
