const Sequelize = require('sequelize')


module.exports = class MysqlClient extends Sequelize {
  constructor(dbName) {
    super(dbName, 'root', process.env.MYSQL_ROOT_PW, { dialect: 'mysql', logging: false })

    this.CpuLoadSchema = this.define('cpuLoad', {
      timestamp: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true },
      host: Sequelize.STRING,
      loadAvg1: Sequelize.DOUBLE.UNSIGNED,
      loadAvg5: Sequelize.DOUBLE.UNSIGNED,
      loadAvg15: Sequelize.DOUBLE.UNSIGNED,
    }, { freezeTableName: true, timestamps: false })

    this.MemSchema = this.define('mem', {
      timestamp: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true },
      host: Sequelize.STRING,
      total: Sequelize.INTEGER.UNSIGNED,
      used: Sequelize.INTEGER.UNSIGNED,
      free: Sequelize.INTEGER.UNSIGNED,
    }, { freezeTableName: true, timestamps: false })

    this.sync()
  }
}
