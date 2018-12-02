const { Command, flags } = require('@oclif/command')
const prettyTime = require('pretty-time')

const InfluxdbClient = require('../database-clients/influxdb')
const InfluxdbHandler = require('../handlers/influxdb-handler')
const ExecutionTimer = require('../execution-timer')


class Delete extends Command {
  async run() {
    const { args, flags } = this.parse(Delete)
    const handler = new InfluxdbHandler(new InfluxdbClient(flags.db))
    const timer = new ExecutionTimer()
    const time = await timer.measure(handler.delete)
    console.log(`Execution time: ${prettyTime(time, 'micro')}`)
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
