const Handler = require('./handler')


module.exports = class InfluxdbHandler extends Handler {
  constructor(dbClient) {
    super(dbClient)
  }

  async insertOne() {
    const datum = await this.getCurrentLoad()
    await this.dbClient.CurrentLoadSchema.create({
      host: 'localhost',
      ...datum
    })
  }

  async insertMany(buffer) {
    let data = []
    for (let i = 0; i < buffer; ++i) {
      const datum = await this.getCurrentLoad()
      data.push({
        host: 'localhost',
        ...datum
      })
    }
    await this.dbClient.CurrentLoadSchema.bulkCreate(data)
  }

  async delete() {
    //
  }
}
