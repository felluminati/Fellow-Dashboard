import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CALENDAR = 'GET_CALENDAR'


/**
 * INITIAL STATE
 */
const defaultCalendar = []

/**
 * ACTION CREATORS
 */
const getCalendar = events => ({type: GET_CALENDAR, events})

/**
 * THUNK CREATORS
 */

export const getCalendarThunk = () => async dispatch => {
  try {
      const res = await axios.get('/api/reacto/calender')
      dispatch(getCalendar(res.data || defaultCalendar))
    } catch (err) {
      console.error(err)
    }
}
/**
 * REDUCER
 */
export default function(state = defaultCalendar, action) {
  switch (action.type) {
    case GET_CALENDAR:
      return action.events
    default:
      return state
  }
}
