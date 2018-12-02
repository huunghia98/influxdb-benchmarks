const Handler = require('./handler')


module.exports = class InfluxdbHandler extends Handler {
  constructor(dbClient) {
    super(dbClient)
  }

  async insertOne() {
    const datum = await this.getCurrentLoad()
    await this.dbClient.writePoints([{
      measurement: 'current-load',
      tags: { host: 'localhost' },
      fields: datum
    }])
  }

  async insertMany(buffer) {
    let data = []
    for (let i = 0; i < buffer; ++i) {
      const datum = await this.getCurrentLoad()
      data.push({
        measurement: 'current-load',
        tags: { host: 'localhost' },
        fields: datum
      })
    }
    await this.dbClient.writePoints(data)
  }
}
