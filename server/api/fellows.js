const router = require('express').Router()
const {Fellow} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const fellows = await Fellow.findAll()
    res.json(fellows)
  } catch(err) {
    next(err)
  }
})
