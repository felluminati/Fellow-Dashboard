const Sequelize = require('sequelize')
const db = require('../db')

const Workshop = db.define('workshop', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  github: {
    type: Sequelize.STRING
  },
  solution: {
    type: Sequelize.STRING
  }
})

module.exports = Workshop
