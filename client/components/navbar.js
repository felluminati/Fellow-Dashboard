import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Divider} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="colorNavBar">
    <nav id="navStyle">
      <Link to="/home">
        <img
          src="https://avatars3.githubusercontent.com/u/40247665?s=400&u=f2d4d977e1c152882a5d647df723d76264f60ef0&v=4"
          height="30px"
          width="30px"
        />
      </Link>
      {isLoggedIn ? (
        <div style={{display: "inline"}}>
          {/* The navbar will show these links after you log in */}
          <Link id="navTabLinks" to="/reacto">Reactos</Link>
          <Link id="navTabLinks" to="/home">Workshops</Link>
          <Link id="navTabLinks" to="/home">Grading</Link>
          <a id="navTabLinks" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div style={{display: "inline"}}>
          {/* The navbar will show these links before you log in */}
          <Link id="navTabLinks" to="/login">Login</Link>
          <Link id="navTabLinks" to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <Divider horizontal></Divider>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
