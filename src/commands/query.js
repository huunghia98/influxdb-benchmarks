const { Command, flags } = require('@oclif/command')
const prettyTime = require('pretty-time')

const InfluxdbClient = require('../database-clients/influxdb')
const MysqlClient = require('../database-clients/mysql')
const InfluxdbHandler = require('../handlers/influxdb-handler')
const MysqlHandler = require('../handlers/mysql-handler')
const ExecutionTimer = require('../execution-timer')


class Query extends Command {
  async run() {
    const { args, flags } = this.parse(Query)
    let handler
    if (args.dbms === 'influxdb') handler = new InfluxdbHandler(new InfluxdbClient(flags.db))
    else handler = new MysqlHandler(new MysqlClient(flags.db))
    const timer = new ExecutionTimer()
    const time = await timer.measure(handler.query)
    console.log(`Execution time: ${prettyTime(time, 'micro')}`)
  }
}

Query.description = `Query data from InfluxDB or MySQL`

Query.args = [
  {
    name: 'dbms',
    required: true,
    description: 'Database management system',
    options: ['influxdb', 'mysql']
  },
]

Query.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  db: flags.string({ description: 'database name', default: 'systemusage' }),
}


module.exports = Query
