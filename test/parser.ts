import { describe, it } from "mocha"
import { assert } from "chai"
import { parse } from '../src/parser'
import type { Log } from '../src/types';

const line = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"

const lines = "\n"

describe('parser', () => {
  it('a line', () => {
    const log: Log = parse(line)[0]
    const expectedDate = new Date("10/Jul/2021 13:37:14 +0000")

    assert.equal(log.time.getTime(), expectedDate.getTime())
    assert.equal(log.method, "GET")
    assert.equal(log.status, 403)
    assert.equal(log.uri, "/fetch")
    assert.equal(log.reqtime, 0.003)
  })

  it('two lines', () => {
    const logs: Log[] = parse(`${line}\n${line}`)

    const expectedDate = new Date("10/Jul/2021 13:37:14 +0000")

    assert.equal(logs[1].time.getTime(), expectedDate.getTime())
    assert.equal(logs[1].method, "GET")
    assert.equal(logs[1].status, 403)
    assert.equal(logs[1].uri, "/fetch")
    assert.equal(logs[1].reqtime, 0.003)
  })

  it('with empty line', () => {
    const logs: Log[] = parse(lines)
    assert.equal(logs.length, 0)
  })
})
