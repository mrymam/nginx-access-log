import { describe, it } from "mocha"
import { assert } from "chai"
import { fileter } from '../src/profiler'
import { parse } from '../src/parser'
import type { Log, FilterQuery } from '../src/types';

const line = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"

describe('parser', () => {
  const logs: Log[] = parse(line)

  it('fileter method', () => {
    const query: FilterQuery = { methods: ["GET"] }
    const query2: FilterQuery = { methods: ["POST"] }
    assert.equal(fileter(logs, query).length, 1)
    assert.equal(fileter(logs, query2).length, 0)
  })
})
