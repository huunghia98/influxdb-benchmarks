const Sequelize = require('sequelize')


module.exports = class MysqlClient extends Sequelize {
  constructor(dbName) {
    super(dbName, 'root', process.env.MYSQL_ROOT_PW || '#08L05q98M*Maria', { dialect: 'mysql', logging: false })

    this.CpuLoadSchema = this.define('cpuLoad', {
      timestamp: { type: Sequelize.BIGINT, primaryKey: true },
      host: Sequelize.STRING,
      loadAvg1: Sequelize.DOUBLE,
      loadAvg5: Sequelize.DOUBLE,
      loadAvg15: Sequelize.DOUBLE,
    }, { freezeTableName: true, timestamps: false })

    this.MemSchema = this.define('mem', {
      timestamp: { type: Sequelize.BIGINT, primaryKey: true },
      host: Sequelize.STRING,
      total: Sequelize.INTEGER,
      used: Sequelize.INTEGER,
      free: Sequelize.INTEGER,
    }, { freezeTableName: true, timestamps: false })

    this.sync()
  }
}
