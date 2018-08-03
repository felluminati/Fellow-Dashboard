const Sequelize = require('sequelize')
const db = require('../db')

const Cohort = db.define('cohort', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  phase: Sequelize.ENUM('Junior','Senior')
})

module.exports = Cohort
