type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | '' | '-'

const isMethod = (methodStr: string): methodStr is Method => {
  return ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', '', '-'].includes(methodStr)
}

type Log = {
  time: Date,
  host: string,
  forwardedfor: string,
  req: string,
  status: number,
  method: Method,
  uri: string,
  size: number,
  referer: string,
  ua: string,
  reqtime: number,
  cache: string,
  runtime: string,
  apptime: number,
  vhost: string
}

type DigestItem = {
  count: number,
  count2xx: number,
  count3xx: number,
  count4xx: number,
  count5xx: number,
  min: number,
  max: number,
  sum: number,
  average: number,
  maxBody: number,
  minBody: number,
  averageBody: number,
  method: Method,
  uri: string
}

type FilterQuery = {
  methods: Method[]
}

export type { Log, DigestItem, Method, FilterQuery }
export { isMethod }