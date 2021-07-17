import type { Log, FilterQuery } from './types'

const fileter = (logs: Log[], query: FilterQuery): Log[] => {
  return logs.filter((log: Log) => {
    return query.methods.includes(log.method)
  })
}

export { fileter }