import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COHORTS = 'GET_COHORTS'


/**
 * INITIAL STATE
 */
const defaultCohorts = []

/**
 * ACTION CREATORS
 */
const getCohorts = cohorts => ({type: GET_COHORTS, cohorts})

/**
 * THUNK CREATORS
 */

export const getCohortsThunk = () => async dispatch => {
  try {
      const res = await axios.get('/api/cohort')
      dispatch(getCohorts(res.data || defaultCohorts))
    } catch (err) {
      console.error(err)
    }
}
/**
 * REDUCER
 */
export default function(state = defaultCohorts, action) {
  switch (action.type) {
    case GET_COHORTS:
      return action.cohorts
    default:
      return state
  }
}
