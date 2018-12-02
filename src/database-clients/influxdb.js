const influx = require('influx')


const schemas = [
  {
    measurement: 'current-load',
    fields: {
      load: influx.FieldType.FLOAT,
      loadUser: influx.FieldType.FLOAT,
      loadSystem: influx.FieldType.FLOAT,
    },
    tags: ['host']
  }
]


module.exports = class InfluxdbClient extends influx.InfluxDB {
  constructor(dbName) {
    super({ host: 'localhost', database: dbName, schema: schemas })
  }
}
