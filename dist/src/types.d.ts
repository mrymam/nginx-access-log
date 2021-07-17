declare type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | '' | '-';
declare const isMethod: (methodStr: string) => methodStr is Method;
declare type Log = {
    time: Date;
    host: string;
    forwardedfor: string;
    req: string;
    status: number;
    method: Method;
    uri: string;
    size: number;
    referer: string;
    ua: string;
    reqtime: number;
    cache: string;
    runtime: string;
    apptime: number;
    vhost: string;
};
declare type DigestItem = {
    count: number;
    count2xx: number;
    count3xx: number;
    count4xx: number;
    count5xx: number;
    min: number;
    max: number;
    sum: number;
    average: number;
    maxBody: number;
    minBody: number;
    averageBody: number;
    sumBody: number;
    method: Method;
    uri: string;
};
declare type FilterQuery = {
    methods: Method[];
};
declare type DigestQuery = {
    uriPatterns: string[];
};
export type { Log, DigestItem, Method, FilterQuery, DigestQuery };
export { isMethod };
