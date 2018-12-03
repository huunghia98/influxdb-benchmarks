const Sequelize = require('sequelize')


module.exports = class MysqlClient extends Sequelize {
  constructor(dbName) {
    super(dbName, 'root', process.env.MYSQL_ROOT_PW || '#08L05q98M*Maria', { dialect: 'mysql', logging: false })

    this.CurrentLoadSchema = this.define('current-load', {
      host: Sequelize.STRING,
      load: Sequelize.DOUBLE,
      loadUser: Sequelize.DOUBLE,
      loadSystem: Sequelize.DOUBLE,
    }, { freezeTableName: true })
    this.sync()
  }
}
