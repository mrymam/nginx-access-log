# nginx-access-log

[![NPM](https://nodei.co/npm/nginx-access-log.png?downloads=true)](https://nodei.co/npm/nginx-access-log/)

This is [npm package](https://www.npmjs.com/package/nginx-access-log) for parse/profile nginx access log.

[Japanese README](https://github.com/onyanko-pon/nginx-access-log/blob/main/README.jp.md)

## Installation

Using npm or yarn
```bash
$ npm i nginx-log-profiler @type/nginx-log-profiler
```

## Usage

```typescript

const { parse, digest } = require('nginx-access-log')

const logData = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"
const logs = parse(logData)
const result = digest(logs)
console.log(result)

// [
//   {
//     count: 1,
//     count2xx: 0,
//     count3xx: 0,
//     count4xx: 1,
//     count5xx: 0,
//     min: 0.003,
//     max: 0.003,
//     sum: 0.003,
//     average: 0.003,
//     maxBody: 5,
//     minBody: 5,
//     averageBody: 5,
//     sumBody: 5,
//     method: "GET",
//     uri: '/fetch'
//   }
// ]

```


# nginx log format

output nginx logs according to the following example

```nginx
http {
  log_format ltsv "time:$time_local"
    "\thost:$remote_addr"
    "\tforwardedfor:$http_x_forwarded_for"
    "\treq:$request"
    "\tmethod:$request_method"
    "\turi:$request_uri"
    "\tstatus:$status"
    "\tsize:$body_bytes_sent"
    "\treferer:$http_referer"
    "\tua:$http_user_agent"
    "\treqtime:$request_time"
    "\truntime:$upstream_http_x_runtime"
    "\tapptime:$upstream_response_time"
    "\tcache:$upstream_http_x_cache"
    "\tvhost:$host";

  access_log  /var/log/nginx/access.log ltsv;
}
```