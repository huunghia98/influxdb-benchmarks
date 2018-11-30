const { Command, flags } = require('@oclif/command')


class HelloCommand extends Command {
  async run() {
    const { args, flags } = this.parse(HelloCommand)
  }
}

HelloCommand.description = `InfluxDB benchmarks
`

HelloCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
}


module.exports = HelloCommand
