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
        tags: { host: 'localhost' },
        fields: datum.cpuLoad,
        timestamp
      },
      {
        tags: { host: 'localhost' },
        fields: datum.mem,
        timestamp
      }
    ]
  }

  async insertOne() {
    const datum = this.getDatum()
    await this.dbClient.writeMeasurement('cpuLoad', [datum[0]])
    await this.dbClient.writeMeasurement('mem', [datum[1]])
  }

  async insertMany(buffer) {
    let cpuLoadData = []
    let memData = []
    for (let i = 0; i < buffer; ++i) {
      const datum = this.getDatum()
      cpuLoadData.push(datum[0])
      memData.push(datum[1])
    }
    await this.dbClient.writeMeasurement('cpuLoad', cpuLoadData)
    await this.dbClient.writeMeasurement('mem', memData)
    console.log(`Inserted ${buffer} records`)
  }

  async delete() {
    await this.dbClient.dropSeries({
      where: (e) => e.tag('host').equals.value('localhost')
    })
  }

  async query() {
    await this.dbClient.queryRaw('select max(loadAvg1) from cpuLoad')
    await this.dbClient.queryRaw('select count(used) from mem where used > total/2 order by time desc')
  }
}
