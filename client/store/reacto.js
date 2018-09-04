import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REACTOS = 'GET_REACTOS'
const UPDATE_REACTO = 'UPDATE_REACTO'

/**
 * INITIAL STATE
 */
const defaultReactos = []

/**
 * ACTION CREATORS
 */
const getReactos = reactos => ({type: GET_REACTOS, reactos})
const updateReacto = reacto => ({type: UPDATE_REACTO, reacto})

/**
 * THUNK CREATORS
 */
export const getReactosThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/reactos')
    return dispatch(getReactos(res.data || defaultReactos))
  } catch (err) {
    console.error(err)
  }
}

export const updateReactoThunk = (reacto) => async dispatch => {
  try {
    const res = await axios.put(`/api/reactos/${reacto.id}`, reacto)
    return dispatch(updateReacto(res.data || defaultReactos))
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
    case UPDATE_REACTO:
      return state.map(reacto => reacto.id === Number(action.reacto.id) ?
        {...reacto, fellow: action.reacto.fellow, fellowId: action.reacto.fellowId} :
        reacto )
    default:
      return state
  }
}
