const router = require('express').Router()
const {User, Reacto, Fellow, Calendar} = require('../db/models')
const rp = require('request-promise')
const Axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reactos = await Reacto.findAll({
      include: [
        {
          model: Fellow
        }, {
          model: Calendar,
          as: 'date_assigned'
        }
      ]
    })
    res.json(reactos)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {name, htmlUrl, week, fellow} = req.body
    await Reacto.update({
      name,
      htmlUrl,
      week
    }, {
      where: {
        id: req.params.id
      }
    })
    const reacto = await Reacto.findById(req.params.id)
    if(fellow.id) {
      const fellowToAssign = await Fellow.findById(fellow.id)
      await reacto.setFellow(fellowToAssign)
    }
    console.log('updated reacto successfully')
    res.json(reacto)
  } catch(err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const {data} = await Axios({
//       url: 'https://api.github.com/repos/FullstackAcademy/technical-interview-prep/contents/algorithms',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `token ${req.user.githubToken}`
//       }
//     })
//     res.json(data);
//   } catch (err) {
//       next(err)
//   }
// })

router.get('/calender', async (req,res,next) => {
  try{
    const calendarList = await Axios({
      url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${req.user.googleToken}`
      }
    })
    const testCalendar = calendarList.data.items.filter(calendar => {
      return calendar.summary.startsWith('1806')
    }
  )
    const {data} = await Axios({
      url: `https://www.googleapis.com/calendar/v3/calendars/${testCalendar[0].id}/events?singleEvents=true&orderBy=startTime&q=REACTO`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.user.googleToken}`
    }
    })
    res.json(data.items);
  } catch (err) {
    next(err)
  }
})
