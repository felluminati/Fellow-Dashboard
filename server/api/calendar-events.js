const router = require('express').Router()
const {CalendarEvent, Fellow, Week, Reacto} = require('../db/models')
const Axios = require('axios')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const calendarEvents = await CalendarEvent.findAll({
      where: {
        name: {
          [Op.like]: 'REACTO'
        }
      },
      order:[['startDate','ASC']],
      include: [Reacto,Fellow, Week]
    })
    res.json(calendarEvents);
  } catch(err) {
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    const {name, startDate, fellow} = req.body
    await Reacto.update({
      name,
      startDate,
      fellow
    }, {
      where: {
        id: req.params.id
      }
    })
    const event = await CalendarEvent.findById(req.params.id)
    if(fellow.id) {
      const fellowToAssign = await Fellow.findById(fellow.id)
      await event.setFellow(fellowToAssign)
    }
    const updatedEvent = await CalendarEvent.find({
      where: {
        id: req.params.id
      },
        include: [Week, Reacto, Fellow]
    })
    console.log('updated reacto successfully')
    res.json(updatedEvent)
  } catch(err) {
    next(err)
  }
})
