const Handler = require('./handler')


module.exports = class InfluxdbHandler extends Handler {
  constructor(dbClient) {
    super(dbClient)
  }

  getDatum() {
    const datum = this.systemUsage.export()
    const hrTime = process.hrtime()
    const timestamp = hrTime[0] * 1000000 + Math.round(hrTime[1] / 1000) // microseconds
    return [
      {
        timestamp,
        host: 'localhost',
        ...datum.cpuLoad
      },
      {
        timestamp,
        host: 'localhost',
        ...datum.mem
      }
    ]
  }

  async insertOne() {
    const datum = this.getDatum()
    await this.dbClient.CpuLoadSchema.create(datum[0])
    await this.dbClient.MemSchema.create(datum[1])
  }

  async insertMany(buffer) {
    let cpuLoadData = []
    let memData = []
    for (let i = 0; i < buffer; ++i) {
      const datum = this.getDatum()
      cpuLoadData.push(datum[0])
      memData.push(datum[1])
    }
    await this.dbClient.CpuLoadSchema.bulkCreate(cpuLoadData)
    await this.dbClient.MemSchema.bulkCreate(memData)
    console.log(`Inserted ${buffer} records`)
  }

  async delete() {
    await this.dbClient.CpuLoadSchema.destroy({
      where: { host: 'localhost' }
    })
    await this.dbClient.MemSchema.destroy({
      where: { host: 'localhost' }
    })
  }

  async query() {
    await this.dbClient.query(
      'select max(loadAvg1) from cpuLoad',
      { type: this.dbClient.QueryTypes.SELECT }
    )
    await this.dbClient.query(
      'select count(used) from mem where used > total/2 order by timestamp desc',
      { type: this.dbClient.QueryTypes.SELECT }
    )
  }
}
