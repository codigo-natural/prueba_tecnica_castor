export const fmtMSS = (seconds) => {
  return new Date(seconds).toISOString().substring(15, 15 + 4)
}
