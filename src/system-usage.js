const si = require('systeminformation')


module.exports = class SystemUsage {
  async getCpuLoad() {
    try {
      const data = await si.currentLoad()
      return {
        load: data.currentload,
        loadUser: data.currentload_user,
        loadSystem: data.currentload_system,
      }
    } catch (err) {
      return null
    }
  }

  async getMem() {
    try {
      const data = await si.mem()
      return {
        total: data.total,
        free: data.free,
        used: data.used,
        active: data.active,
        buffcache: data.buffcache,
      }
    } catch (err) {
      return null
    }
  }

  async export() {
    return {
      cpuLoad: await this.getCpuLoad(),
      mem: await this.getMem(),
    }
  }
}
