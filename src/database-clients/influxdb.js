const influx = require('influx')


const schemas = [
  {
    measurement: 'cpuLoad',
    fields: {
      loadAvg1: influx.FieldType.FLOAT,
      loadAvg5: influx.FieldType.FLOAT,
      loadAvg15: influx.FieldType.FLOAT,
    },
    tags: ['host']
  },
  {
    measurement: 'mem',
    fields: {
      total: influx.FieldType.INTEGER,
      used: influx.FieldType.INTEGER,
      free: influx.FieldType.INTEGER,
    },
    tags: ['host']
  },
]


module.exports = class InfluxdbClient extends influx.InfluxDB {
  constructor(dbName) {
    super({ host: 'localhost', database: dbName, schema: schemas })
  }
}
