import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REACTOS = 'GET_REACTO'


/**
 * INITIAL STATE
 */
const defaultReactos = []

/**
 * ACTION CREATORS
 */
const getReactos = reactos => ({type: GET_REACTOS, reactos})

/**
 * THUNK CREATORS
 */
export const getReactosThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/reacto')
    dispatch(getReactos(res.data || defaultReactos))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReactos, action) {
  switch (action.type) {
    case GET_REACTOS:
      return action.reactos
    default:
      return state
  }
}