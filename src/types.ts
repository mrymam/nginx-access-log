type Log = {
  time: Date,
  host: string,
  forwardedfor: string,
  req: string,
  status: number,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | '' | '-',
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
  min: number,
  max: number,
  average: number,
  maxBody: number,
  minBody: number,
  averageBody: number,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | '' | '-',
  url: string
}