const Sequelize = require('sequelize')
const db = require('../db')

const WeekTopic = db.define('week_topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  num: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = WeekTopic
