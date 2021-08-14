import type { Log, FilterQuery, DigestItem, DigestQuery } from './types'

const filter = (logs: Log[], query: FilterQuery): Log[] => {
  return logs.filter((log: Log) => {
    return query.methods.includes(log.method)
  })
}

type digestHash = { [key: string]: Log[] }

const updateUri = (logs: Log[], query: DigestQuery = { uriPatterns: [] }): Log[] => {

  if (query.uriPatterns.length === 0) {
    return logs
  }

  return logs.map((log: Log) => {

    for (const uriPattern of query.uriPatterns) {
      if ((new RegExp(uriPattern)).test(log.uri)) {
        log = {
          ...log,
          uri: uriPattern
        }
        return log
      }
    }
    return log
  })
}

const digest = (logs: Log[], query: DigestQuery = { uriPatterns: [] }): DigestItem[] => {

  logs = updateUri(logs, query)

  const logsHash: digestHash = logs.reduce((hash: digestHash, log: Log) => {
    const key = `${log.method}-${log.uri}`
    if (!hash[key]) {
      hash[key] = [log]
      return hash
    }
    hash[key].push(log)
    return hash
  }, {});

  const keys: string[] = Object.keys(logsHash)
  return keys.map((key: string) => {
    const logs = logsHash[key]
    const reqtimes = logs.map((log: Log) => log.reqtime)
    const sum = reqtimes.reduce((sum: number, reqtime: number) => sum + reqtime, 0)
    const average = sum / reqtimes.length
    const count2xx = logs.filter((log: Log) => log.status < 300).length
    const count3xx = logs.filter((log: Log) => log.status >= 300 && log.status < 400).length
    const count4xx = logs.filter((log: Log) => log.status >= 400 && log.status < 500).length
    const count5xx = logs.filter((log: Log) => log.status >= 500).length

    const bodies = logs.map((log: Log) => log.size)
    const sumBody = bodies.reduce((sum: number, bodySize: number) => sum + bodySize, 0)
    const averageBody = sumBody / bodies.length

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
    }
  })
}

export { filter, digest }