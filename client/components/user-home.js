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
      <div>
      <h1 style={{
        display: "inline",
        paddingLeft: '6em',
        fontFamily: 'Apple Chancery, cursive',
        color: 'black',
        fontSize: '4rem'
        }}> WELCOME TO FELLUMINATI</h1>
        <img
        src="https://media1.tenor.com/images/140294fd47bb57acbe431572da23f7d2/tenor.gif?itemid=5346554"
        style={{
          height: "400px",
          width: "400px",
          display: 'block',
          paddingTop: '3em',
          margin: 'auto'
        }}
        />
      </div>
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
