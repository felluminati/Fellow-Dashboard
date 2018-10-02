const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/calendar', require('./calendar-events'))
router.use('/reactos', require('./reactos'))
router.use('/cohort', require('./cohort'))
router.use('/fellows', require('./fellows'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
