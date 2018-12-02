const si = require('systeminformation')

const constants = require('../constants')


module.exports = class Handler {
  constructor(dbClient) {
    this.dbClient = dbClient

    this.insert = this.insert.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getCurrentLoad() {
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

  async insertOne() {
    // need overriding
  }

  async insertMany(buffer) {
    // need overriding
  }

  async insert(nrecords, options={}) {
    if (options.optimized) {
      let i
      for (i = 0; i < nrecords; i += constants.BUFFER) await this.insertMany(constants.BUFFER)
      await this.insertMany(constants.BUFFER - (i - nrecords))
    } else {
      for (let i = 0; i < nrecords; ++i) await this.insertOne()
    }
  }

  async delete(nrecords, options={}) {
    //
  }
}
