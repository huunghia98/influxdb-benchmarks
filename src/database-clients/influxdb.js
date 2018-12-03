const influx = require('influx')


const schemas = [
  {
    measurement: 'cpu-load',
    fields: {
      load: influx.FieldType.FLOAT,
      loadUser: influx.FieldType.FLOAT,
      loadSystem: influx.FieldType.FLOAT,
    },
    tags: ['host']
  },
  {
    measurement: 'mem',
    fields: {
      total: influx.FieldType.INTEGER,
      free: influx.FieldType.INTEGER,
      used: influx.FieldType.INTEGER,
      active: influx.FieldType.INTEGER,
      buffcache: influx.FieldType.INTEGER,
    },
    tags: ['host']
  },
]


module.exports = class InfluxdbClient extends influx.InfluxDB {
  constructor(dbName) {
    super({ host: 'localhost', database: dbName, schema: schemas })
  }
}
