module.exports = class ExecutionTimer {
  async measure(func, args=[]) {
    const start = process.hrtime()
    await func(...args)
    return process.hrtime(start)
  }
}
