const os = require('os')


module.exports = class SystemUsage {
  constructor() {
    this.totalMem = os.totalmem()
  }

  getCpuLoad() {
    const loadAvg = os.loadavg()
    return {
      loadAvg1: loadAvg[0],
      loadAvg5: loadAvg[1],
      loadAvg15: loadAvg[2]
    }
  }

  getMem() {
    const freeMem = os.freemem()
    return {
      total: this.totalMem,
      used: this.totalMem - freeMem,
      free: freeMem,
    }
  }

  export() {
    return {
      cpuLoad: this.getCpuLoad(),
      mem: this.getMem(),
    }
  }
}
