import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {Button, Icon } from 'semantic-ui-react'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, googleId} = props
  if(googleId) {
    return(
      <h1>USER DASHBOARD</h1>
    )
  } else {
      return (
        <div>
          <h3>Welcome, {email}</h3>
          <a href="/auth/google">
                <Button color="google plus" type="button" >
                  <Icon name="google" />
                  Authorize with Google
                </Button>
          </a>
        </div>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    googleId: state.user.googleId
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
