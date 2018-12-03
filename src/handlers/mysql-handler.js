const Handler = require('./handler')


module.exports = class InfluxdbHandler extends Handler {
  constructor(dbClient) {
    super(dbClient)
  }

  async getDatum() {
    const datum = await this.systemUsage.export()
    return [
      {
        host: 'localhost',
        ...datum.cpuLoad
      },
      {
        host: 'localhost',
        ...datum.mem
      }
    ]
  }

  async insertOne() {
    const datum = await this.getDatum()
    await this.dbClient.CpuLoadSchema.create(datum[0])
    await this.dbClient.MemSchema.create(datum[1])
  }

  async insertMany(buffer) {
    let cpuLoadData = []
    let memData = []
    for (let i = 0; i < buffer; ++i) {
      const datum = await this.getDatum()
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
}
