const User = require('./user')
const Reacto = require('./reacto')
const CalendarEvent = require('./calendar')
const Fellow = require('./fellow')
const Week = require('./week')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

 /**
  * For each cohort period, a REACTO will only be assigned to one fellow,
  * and a Fellow can have multiple REACTOs assigned to him/her.
  */


CalendarEvent.belongsTo(Reacto)
Reacto.hasOne(CalendarEvent)

CalendarEvent.belongsTo(Fellow)
Fellow.hasMany(CalendarEvent)

CalendarEvent.belongsTo(Week)
Week.hasMany(CalendarEvent)

Reacto.belongsTo(Week)
Week.hasMany(Reacto)

module.exports = {
  User,
  Reacto,
  CalendarEvent,
  Fellow,
  Week
}
