'use strict'

const db = require('../server/db')
const {User, Calendar, Fellow, Reacto, WeekTopic} = require('../server/db/models')
const { calendarData, fellowData, reactoData, weekData} = require('./seed-data');

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({firstName: 'Samir', lastName: 'Thakral', email: 'samir@email.com', password: '123'}),
  ])

  await populateModels()

  await db.sync()

  const calendars = await Calendar.findAll()
  const fellows = await Fellow.findAll()
  const reactos = await Reacto.findAll()
  const weeks = await WeekTopic.findAll()

  await setReactoFellow(reactos, fellows)
  await setReactoCalendar(reactos, calendars)
  await setReactoWeekTopic(reactos, weeks)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function populateModels() {
  const calendarP = Calendar.bulkCreate(calendarData)
  const fellowP = Fellow.bulkCreate(fellowData)
  const reactoP = Reacto.bulkCreate(reactoData)
  const weekP = WeekTopic.bulkCreate(weekData)

  await Promise.all([calendarP, fellowP, reactoP, weekP]);
}

async function setReactoFellow(reactos, fellows) {
  let fellowId = 1
  for(let i = 0; i < reactos.length; i++) {
    if(fellowId >= fellows.length) fellowId = 1
    const reacto = reactos[i]
    await reacto.setFellow(fellowId)
    fellowId += 1
  }
}

async function setReactoCalendar(reactos, calendars) {
  for(let i = 0; i < reactos.length; i++) {
    const reacto = reactos[i]
    for(let j = 0; j < calendars.length; j++) {
      const event = calendars[j]
      if(reacto.name === event.name) {
        await reacto.setDate_assigned(event)
      }
    }
  }
}

async function setReactoWeekTopic(reactos, weeks) {
  for(let i = 0; i < reactos.length; i++) {
    const reacto = reactos[i]
    for(let j = 0; j < weeks.length; j++) {
      const week = weeks[j]
      if(reacto.week === week.num) {
        await reacto.setWeek_topic(week)
      }
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
