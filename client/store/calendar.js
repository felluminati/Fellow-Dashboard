import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CALENDAR = 'GET_CALENDAR'
const UPDATE_CALENDAR = 'UPDATE_CALENDAR'

/**
 * INITIAL STATE
 */
const defaultCalendar = []

/**
 * ACTION CREATORS
 */
const getCalendar = events => ({type: GET_CALENDAR, events})
const updateCalendar = event => ({type: UPDATE_CALENDAR, event})


/**
 * THUNK CREATORS
 */

export const getCalendarThunk = () => async dispatch => {
  try {
      const res = await axios.get('/api/calendar')
      dispatch(getCalendar(res.data || defaultCalendar))
    } catch (err) {
      console.error(err)
    }
}

export const updateCalendarThunk = (event) => async dispatch => {
    try {
      const res = await axios.put(`/api/calendar/${event.id}`, event)
      return dispatch(updateCalendar(res.data || defaultCalendar))
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
      case UPDATE_CALENDAR:
      return state.map(event => event.id === Number(action.event.id) ?
        {...event, fellow: action.event.fellow, fellowId: action.event.fellowId} :
        event )
    default:
      return state
  }
}
