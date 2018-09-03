import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FELLOWS = 'GET_FELLOWS'


/**
 * INITIAL STATE
 */
const defaultFellows = []

/**
 * ACTION CREATORS
 */
const getFellows = fellows => ({type: GET_FELLOWS, fellows})

/**
 * THUNK CREATORS
 */
export const getFellowsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/fellows')
    return dispatch(getFellows(res.data || defaultFellows))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultFellows, action) {
  switch (action.type) {
    case GET_FELLOWS:
      return action.fellows
    default:
      return state
  }
}
