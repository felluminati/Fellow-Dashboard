const Sequelize = require('sequelize')
const db = require('../db')

const Reacto = db.define('reacto', {
  gistLink: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  replLink: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  fellowAssigned: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  dateAssigned: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: true
  }
})

module.exports = Reacto
