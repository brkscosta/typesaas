export const stripUndefined = <T>(obj: T): { data: T } => {
  const data = {} as T
  for (const key in obj) if (obj[key] !== undefined) data[key] = obj[key]
  return { data }
}
