# nginx-access-log

[![NPM](https://nodei.co/npm/nginx-access-log.png?downloads=true)](https://nodei.co/npm/nginx-access-log/)

これは、nginxのアクセスログをパース/プロファイルする[npm パッケージ](https://www.npmjs.com/package/nginx-access-log)です。

## インストール

npmまたはyarnを使用
```bash
$ npm i nginx-log-profiler
```

## 使用例


```javascript

const { parse, digest } = require('nginx-access-log')

const logData = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"
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

TypeScript

```typescript

import type { Log, DigestItem } from 'nginx-access-log'
import { parse, digest } from 'nginx-access-log'

const logData: string = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"
const logs: Log[] = parse(logData)
const result: DigestItem[] = digest(logs)
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

### parse


```typescript
import type { Log, DigestItem } from 'nginx-access-log'
import { parse } from 'nginx-access-log'

const logData: string = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"
const logs: Log[] = parse(logData)
console.log(logs)
```

### filter

```typescript
import type { Log,  FilterQuery } from 'nginx-access-log'
import { parse, filter } from 'nginx-access-log'

const logData: string = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /fetch HTTP/1.1	status:403	method:GET	uri:/fetch	size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"  + "\n" + 
"time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:POST /post HTTP/1.1	status:403	method:POST	uri:/post	size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1" 

const logs: Log[] = parse(logData)
const query: FilterQuery = {method: "GET"}
const logsFilterd: Log[] = filter(logs, query)
console.log(logsFilterd)
```

### digest

```typescript

import type { Log, DigestQuery, DigestItem } from 'nginx-access-log'
import { parse, digest } from 'nginx-access-log'

const logData: string = "time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /users/1 HTTP/1.1	status:403	method:GET	uri:/users/1 size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1"  + "\n" + 
"time:10/Jul/2021:13:37:14 +0000	host:192.168.144.1	forwardedfor:-	req:GET /users/2 HTTP/1.1	status:403	method:GET	uri:/users/2	size:5	referer:http://127.0.0.1/channel/1	ua:IPhone	reqtime:0.003	cache:-	runtime:-	apptime:0.003	vhost:127.0.0.1" 

const logs: Log[] = parse(logData)
const query: DigestQuery = {uriPatterns: ["/users/"]}
const result: DigestItem[] = digest(logs, query)
console.log(result)
```

## nginxログ形式

nginxのアクセスログは、以下のような形式で出力してください。

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