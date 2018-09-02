const Sequelize = require('sequelize')
const db = require('../db')

const Reacto = db.define('reacto', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  htmlUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Reacto
