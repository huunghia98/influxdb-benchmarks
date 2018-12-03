const Sequelize = require('sequelize')


module.exports = class MysqlClient extends Sequelize {
  constructor(dbName) {
    super(dbName, 'root', process.env.MYSQL_ROOT_PW || '#08L05q98M*Maria', { dialect: 'mysql', logging: false })

    this.CpuLoadSchema = this.define('cpu-load', {
      host: Sequelize.STRING,
      load: Sequelize.DOUBLE,
      loadUser: Sequelize.DOUBLE,
      loadSystem: Sequelize.DOUBLE,
    }, { freezeTableName: true })
    this.MemSchema = this.define('mem', {
      host: Sequelize.STRING,
      total: Sequelize.INTEGER,
      free: Sequelize.INTEGER,
      used: Sequelize.INTEGER,
      active: Sequelize.INTEGER,
      buffcache: Sequelize.INTEGER,
    }, { freezeTableName: true })
    this.sync()
  }
}
