const { Command, flags } = require('@oclif/command')
const prettyTime = require('pretty-time')

const InfluxdbClient = require('../database-clients/influxdb')
const MysqlClient = require('../database-clients/mysql')
const InfluxdbHandler = require('../handlers/influxdb-handler')
const MysqlHandler = require('../handlers/mysql-handler')
const ExecutionTimer = require('../execution-timer')


class Insert extends Command {
  async run() {
    const { args, flags } = this.parse(Insert)
    let handler
    if (args.dbms === 'influxdb') handler = new InfluxdbHandler(new InfluxdbClient(flags.db))
    else handler = new MysqlHandler(new MysqlClient(flags.db))
    const timer = new ExecutionTimer()
    const time = await timer.measure(handler.insert, [flags.nrecords, { optimized: flags.optimized }])
    console.log(`Execution time: ${prettyTime(time, 'micro')}`)
  }
}

Insert.description = `Insert data into InfluxDB or MySQL`

Insert.args = [
  {
    name: 'dbms',
    required: true,
    description: 'Database management system',
    options: ['influxdb', 'mysql']
  },
]

Insert.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  db: flags.string({ description: 'database name', default: 'systemusage' }),
  nrecords: flags.integer({ char: 'n', description: 'number of records', default: 1 }),
  optimized: flags.boolean({
    char: 'o',
    description: 'execute in optimization mode',
    default: false,
  }),
}


module.exports = Insert
