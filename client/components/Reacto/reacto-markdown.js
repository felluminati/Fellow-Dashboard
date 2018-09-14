import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import {Dimmer, Loader} from 'semantic-ui-react'

class ReactoMarkdown extends React.Component {
  constructor(){
    super()
    this.state = {
      rawData: ''
    }
  }

  async componentDidMount() {
    try {
      let res = await axios.get(`/api/reactos/markdown?name=${this.props.match.params.name}`)
      this.setState({
        rawData: res.data
      })
    } catch (err) {
      console.error(err)
    }
  }

  render(){
    if(!this.state.rawData){
      return (
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      )
    } else {
      return (
        <div className="markdown-body reacto-markdown">
          <ReactMarkdown source= {this.state.rawData} />
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    reactos: state.reactos
  }
}

const mapDispatch = dispatch => {
  return {

  }
}

export default connect(null, null)(ReactoMarkdown)

