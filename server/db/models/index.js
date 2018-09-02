const User = require('./user')
const Reacto = require('./reacto')
const Calendar = require('./calendar')
const Fellow = require('./fellow')

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
Reacto.belongsTo(Fellow)
Fellow.hasMany(Reacto)

Reacto.belongsTo(Calendar, {as: 'date_assigned'})

module.exports = {
  User,
  Reacto,
  Calendar,
  Fellow
}
