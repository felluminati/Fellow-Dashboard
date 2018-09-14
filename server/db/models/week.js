const Sequelize = require('sequelize')
const db = require('../db')

const Week = db.define('week', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Week
