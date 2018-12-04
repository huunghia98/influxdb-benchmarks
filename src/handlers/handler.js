const constants = require('../constants')
const SystemUsage = require('../system-usage')


module.exports = class Handler {
  constructor(dbClient) {
    this.dbClient = dbClient
    this.systemUsage = new SystemUsage()

    this.insert = this.insert.bind(this)
    this.delete = this.delete.bind(this)
  }

  async insertOne() {
    // need overriding
  }

  async insertMany(buffer) {
    // need overriding
  }

  async insert(nrecords, options={}) {
    if (options.optimized) {
      const buffer = constants.BUFFER
      if (nrecords <= buffer) await this.insertMany(nrecords)
      else {
        let i
        const maxi = nrecords - buffer
        for (i = 0; i < maxi; i += buffer) await this.insertMany(buffer)
        await this.insertMany(nrecords - i)
      }
    } else {
      for (let i = 0; i < nrecords; ++i) await this.insertOne()
    }
    console.log(`Inserted ${nrecords} records in total`)
  }

  async delete() {
    // need overriding
  }
}
