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
    min: number;
    max: number;
    average: number;
    maxBody: number;
    minBody: number;
    averageBody: number;
    method: Method;
    url: string;
};
export type { Log, DigestItem, Method };
export { isMethod };
