const Sequelize = require('sequelize')
const db = require('../db')

const Fellow = db.define('fellow', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
})

module.exports = Fellow
