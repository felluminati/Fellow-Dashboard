const Sequelize = require('sequelize')
const db = require('../db')

const CalendarEvent = db.define('calendarevent', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.STRING
  }
})

module.exports = CalendarEvent
