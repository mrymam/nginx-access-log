import type { Log, FilterQuery, DigestItem, DigestQuery } from './types';
declare const fileter: (logs: Log[], query: FilterQuery) => Log[];
declare const digest: (logs: Log[], query?: DigestQuery) => DigestItem[];
export { fileter, digest };
