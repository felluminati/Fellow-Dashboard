import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class SingleReacto extends Component {
  render() {
    const reactoNum = window.location.pathname.split('/')[2]
    const bodyStyle = {
      margin: '0 auto',
      width: '50%',
      textAlign: 'center'

    }
    return (
      <div style={bodyStyle}>
        <h1>The Single Reacto #{reactoNum}</h1>
        <img src="https://media.giphy.com/media/gB4KWtd3uSsJq/giphy.gif" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(mapState, mapDispatch)(SingleReacto)
