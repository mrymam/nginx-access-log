import type { Log, FilterQuery, DigestItem } from './types'

const fileter = (logs: Log[], query: FilterQuery): Log[] => {
  return logs.filter((log: Log) => {
    return query.methods.includes(log.method)
  })
}

type digestHash = { [key: string]: Log[] }

const digest = (logs: Log[]): DigestItem[] => {
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
      maxBody: 0,
      minBody: 0,
      averageBody: 0,
      method: logs[0].method,
      uri: logs[0].uri
    }
  })
}

export { fileter, digest }