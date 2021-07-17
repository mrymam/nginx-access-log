import type { Log, Method } from './types'
import { isMethod } from './types'
import * as ltsv from 'ltsv'

const nginxTimeString2Date = (timeStr: string): Date => {
  const res = timeStr.split(":")
  if (res.length < 4) {
    return new Date()
  }

  // const [date, hours, minutes, seconds_timelag]: [string, string, string, string] = res
  // return new Date(`${date} ${hours}:${minutes}:${seconds_timelag}`)

  return new Date(`${res[0]} ${res[1]}:${res[2]}:${res[3]}`)

}

const parseLine = (lineStr: string): Log => {
  const obj = ltsv.parseLine(lineStr)
  return {
    time: nginxTimeString2Date(obj.time),
    host: obj.host,
    forwardedfor: obj.forwardedfor,
    req: obj.req,
    status: Number(obj.status),
    method: isMethod(obj.method) ? obj.method : "" ,
    uri: obj.uri,
    size: Number(obj.size),
    referer: obj.referer,
    ua: obj.ua,
    reqtime: Number(obj.reqtime),
    cache: obj.cache,
    runtime: obj.runtime,
    apptime: Number(obj.apptime),
    vhost: obj.vhost
  }
}

const parse = (data: string): Log[] => {
  const lines: string[] = data.split("\n")
  return lines.map(line => {
    return parseLine(line)
  })
}

export { parse }