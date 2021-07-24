import type { Log, FilterQuery, DigestItem, DigestQuery } from './types';
declare const filter: (logs: Log[], query: FilterQuery) => Log[];
declare const digest: (logs: Log[], query?: DigestQuery) => DigestItem[];
export { filter, digest };
