import { describe, it } from "mocha"
import { assert } from "chai"
import { digest, filter } from '../src/profiler'
import type { Log, FilterQuery, DigestItem } from '../src/types'

const baseLog: Log = {
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
}

describe('filter', () => {

  it('filter method', () => {
    const logs: Log[] = [
      baseLog,
      baseLog,
      {
        ...baseLog,
        method: "POST",
      }
    ]

    const query: FilterQuery = { methods: ["GET"] }
    const query2: FilterQuery = { methods: ["POST"] }
    assert.equal(filter(logs, query).length, 2)
    assert.equal(filter(logs, query2).length, 1)
  })

})

describe('digest', () => {

  it('count', () => {
    const logs: Log[] = [
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
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests[0].count, 4)
    assert.equal(digests[0].count2xx, 1)
    assert.equal(digests[0].count3xx, 1)
    assert.equal(digests[0].count4xx, 1)
    assert.equal(digests[0].count5xx, 1)
  })

  it('reqtime', () => {
    const logs: Log[] = [
      baseLog,
      {
        ...baseLog,
        reqtime: 0.2,
      }
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests[0].sum, 0.3)
    assert.equal(digests[0].average, 0.15)
    assert.equal(digests[0].min, 0.1)
    assert.equal(digests[0].max, 0.2)
  })

  it('separate by method', () => {
    const logs: Log[] = [
      baseLog,
      {
        ...baseLog,
        method: "POST"
      }
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests.length, 2)
    assert.equal(digests[0].method, "GET")
    assert.equal(digests[1].method, "POST")
  })

  it('separate by uri', () => {
    const logs: Log[] = [
      baseLog,
      {
        ...baseLog,
        uri: "/b"
      }
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests.length, 2)
    assert.equal(digests[0].uri, "/a")
    assert.equal(digests[1].uri, "/b")
  })

  it('separate by uri and method', () => {
    const logs: Log[] = [
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
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests.length, 4)
  })

  it('size', () => {
    const logs: Log[] = [
      {
        ...baseLog,
        size: 100
      },
      {
        ...baseLog,
        size: 300
      }
    ]
    const digests: DigestItem[] = digest(logs)
    assert.equal(digests.length, 1)
    assert.equal(digests[0].sumBody, 400)
    assert.equal(digests[0].averageBody, 200)
    assert.equal(digests[0].minBody, 100)
    assert.equal(digests[0].maxBody, 300)
  })

  it('merge uri', () => {
    const logs: Log[] = [
      {
        ...baseLog,
        uri: "/icons/aa.jpeg"
      },
      {
        ...baseLog,
        uri: "/icons/bb.jpeg"
      }
    ]
    const digests: DigestItem[] = digest(logs, { uriPatterns: ["/icons"] })
    assert.equal(digests.length, 1)
  })
})
