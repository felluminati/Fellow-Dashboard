import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import { Segment, Form, Icon, Button, Divider } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <Segment padded id="auth-form">
      <Form onSubmit={handleSubmit} name={name}>
        {displayName==="Sign Up" && <Form.Field width="ten">
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
        </Form.Field>}
        {displayName==="Sign Up" && <Form.Field width="ten">
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="password" required/>
        </Form.Field>}
        <Form.Field width="ten">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
        </Form.Field>
        <Form.Field width="ten">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
        </Form.Field>
        {error && error.response && <div> {error.response.data} </div>}
        <div className="auth-buttons">
          <Button primary type="submit">{displayName}</Button>
          <Divider horizontal>Or</Divider>
          <a href="/auth/google">
            <Button color="google plus" type="button" >
              <Icon name="google" />
              {displayName} with Google
            </Button>
          </a>
        </div>
      </Form>
    </Segment>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
