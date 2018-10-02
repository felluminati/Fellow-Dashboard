'use strict'

const db = require('../server/db')
const axios = require('axios');
const {User, CalendarEvent, Fellow, Reacto, Week} = require('../server/db/models')
const { fellowData, weekData, reactoURL } = require('./seed-data');
const Op = require('sequelize').Op
const moment = require('moment');

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({firstName: 'Samir', lastName: 'Thakral', email: 'samir@email.com', password: '123'}),
  ])

  await populateModels()

  await db.sync()

  const calendarEvents = await CalendarEvent.findAll({
    where: {
      name: {
        [Op.like]: 'REACTO'
      }
    },
    order: [['startDate','ASC']]
  })
  const fellows = await Fellow.findAll()
  const allReactoEventsCalendar = await Reacto.findAll({
      where: {
        name: {
          [Op.like]: '%.md'
        }
      },
      order: [['weekId', 'ASC'],[['id', 'ASC']]]
    })
  const reactos = allReactoEventsCalendar.filter(reacto => !isNaN(reacto.name[0]))
  await setCalendarFellow(calendarEvents , fellows)
  await setCalendarWithReacto(reactos, calendarEvents)
  //await setReactoWeekTopic(reactos, weeks)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function populateModels() {
  let reactoData = []
  reactoURL.forEach(async (reacto, index) => {
    let {data} = await axios({
      url: reacto,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token `
      }
    })
    const reactosWithWeek = data.map(reacto => {
      return {...reacto, weekId: index + 1}
    })
    reactoData.push(...reactosWithWeek)
  })
  const calendarList = await axios({
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `
    }
  })
  const testCalendar = calendarList.data.items.filter(calendar => {
    return calendar.summary.startsWith('1807')
  })
  const res = await axios({
    url: `https://www.googleapis.com/calendar/v3/calendars/${testCalendar[0].id}/events?singleEvents=true&orderBy=startTime&q=REACTO`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer `
  }
  })
  const calendarData = res.data.items.map(item => {
    return { name: item.summary, startDate : item.start.dateTime}
  })
  let changeWeek=false
  let weekNum = 0;
  const filteredCalendarData = calendarData.reduce((prev,curr) => {
      if(curr.name === 'REACTO'){
        if(!changeWeek) {
          weekNum++;
          changeWeek = true;
        }
        if(prev.length === 18){
          weekNum++;
        }
        return [...prev, {...curr,weekId: weekNum}]
      } else {
        changeWeek = false
        return prev
      }
  },[])
  const weekP = Week.bulkCreate(weekData)
  const fellowP = Fellow.bulkCreate(fellowData)
  const reactoP = Reacto.bulkCreate(reactoData)
  const calendarP = CalendarEvent.bulkCreate(filteredCalendarData)
  await Promise.all([fellowP, reactoP, weekP, calendarP]);
}

async function setCalendarFellow(calendarEvents, fellows) {
  let fellowId = 1
  for(let i = 0; i < calendarEvents.length; i++) {
    if(fellowId > fellows.length) fellowId = 1
    const event = calendarEvents[i]
    await event.setFellow(fellowId)
    fellowId += 1
  }
}

async function setCalendarWithReacto(reactos, calendarEvents) {
  for(let i = 0, j= 0; j < calendarEvents.length; j++) {
    const reacto = reactos[i]
    const event = calendarEvents[j]
   // console.log(reacto);
    if(event.weekId === reacto.weekId){
      await event.setReacto(reacto)
      i++;
    } else {
      while( reactos[i].weekId !== event.weekId) {
        i++;
      }
      await event.setReacto(reactos[i])
      i++;
    }
  }
}


// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

/*

1) Make axios calls to github to get all the folders in technical-interview-prep/algorithms
2) Make axios calls to each one of the folders (from 2-big-o to 7-mix)
3) Make axios calls to each file in these folders that start with a number and has extension ".md"
4) Seed all reactos

5) Make axios calls to google calendar api (include refresh token for this one)
6) Get cohort calender ID. Make another axios call to get events.
7) Get all events that are named "REACTO"
8) Seed all events in calender

9) Make relationships between calendar events to Reactos, Fellows, 2 Cohorts,
10) Try to automate it. If not, just manually make relationships or assign them.

11) Finish them before 9/10
*/
