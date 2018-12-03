const { Command, flags } = require('@oclif/command')
const prettyTime = require('pretty-time')

const InfluxdbClient = require('../database-clients/influxdb')
const MysqlClient = require('../database-clients/mysql')
const InfluxdbHandler = require('../handlers/influxdb-handler')
const MysqlHandler = require('../handlers/mysql-handler')
const ExecutionTimer = require('../execution-timer')


class Delete extends Command {
  async run() {
    const { args, flags } = this.parse(Delete)
    let dbClient, handler
    if (args.dbms === 'influxdb') {
      dbClient = new InfluxdbClient(flags.db)
      handler = new InfluxdbHandler(dbClient)
    } else {
      dbClient = new MysqlClient(flags.db)
      handler = new MysqlHandler(dbClient)
    }
    const timer = new ExecutionTimer()
    const time = await timer.measure(handler.delete)
    console.log(`Execution time: ${prettyTime(time, 'micro')}`)
    if (args.dbms === 'mysql') dbClient.close()
  }
}

Delete.description = `Delete data from InfluxDB or MySQL`

Delete.args = [
  {
    name: 'dbms',
    required: true,
    description: 'Database management system',
    options: ['influxdb', 'mysql']
  },
]

Delete.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  db: flags.string({ description: 'database name', default: 'system-usage' }),
}


module.exports = Delete
