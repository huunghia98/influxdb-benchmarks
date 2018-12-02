const { Command, flags } = require('@oclif/command')
const prettyTime = require('pretty-time')

const Handler = require('../handlers/handler')
const ExecutionTimer = require('../execution-timer')


class GetData extends Command {
  async run() {
    const { flags } = this.parse(GetData)
    const handler = new Handler(null)
    const timer = new ExecutionTimer()
    const time = await timer.measure(async () => {
      for (let i = 0; i < flags.nrecords; ++i) await handler.getCurrentLoad()
    })
    console.log(`Execution time: ${prettyTime(time, 'micro')}`)
  }
}

GetData.description = `Get data sample`

GetData.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  nrecords: flags.integer({ char: 'n', description: 'number of records', default: 1 }),
}


module.exports = GetData
