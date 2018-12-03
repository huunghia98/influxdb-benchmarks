const Handler = require('./handler')


module.exports = class InfluxdbHandler extends Handler {
  constructor(dbClient) {
    super(dbClient)
  }

  async getDatum() {
    const datum = await this.systemUsage.export()
    return [
      {
        measurement: 'cpu-load',
        tags: { host: 'localhost' },
        fields: datum.cpuLoad
      },
      {
        measurement: 'mem',
        tags: { host: 'localhost' },
        fields: datum.mem
      }
    ]
  }

  async insertOne() {
    await this.dbClient.writePoints(await this.getDatum())
  }

  async insertMany(buffer) {
    let data = []
    for (let i = 0; i < buffer; ++i) {
      const datum = await this.getDatum()
      data.push(...datum)
    }
    await this.dbClient.writePoints(data)
  }

  async delete() {
    await this.dbClient.dropSeries({
      measurement: (m) => m.name('cpu-load'),
      where: (e) => e.tag('host').equals.value('localhost')
    })
  }
}
