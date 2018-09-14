const Sequelize = require('sequelize')
const db = require('../db')

const Reacto = db.define('reacto', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  html_url: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  download_url: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

Reacto.prototype.fellowLecture = () =>  this.filter(reacto => !isNaN(reacto.name[0]))

module.exports = Reacto
