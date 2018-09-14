import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

class Workshops extends React.Component {
  constructor(){
    super()
    this.state = {
      test: ''
    }
  }

  async componentDidMount() {
    try {
      let res = await axios.get('/api/reactos/workshops');
      this.setState({
        test: res.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render(){
    return (
      <div>
        <h1>Inside Workshops</h1>
        <ReactMarkdown source= {this.state.test} />
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

export default connect(null, null)(Workshops)

