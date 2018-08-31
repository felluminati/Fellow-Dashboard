import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class AllReactos extends Component {

  handleClick = (evt) => {
    const cellText = evt.target.innerHTML
    const reactoId = +cellText.split(' ')[1]
    this.props.history.push(`/reacto/${reactoId}`)
  }

  render() {
    const bodyStyle = {
      margin: '0 auto',
      width: '50%',
      textAlign: 'center'

    }
    return (
      <div style={bodyStyle}>
        <h1>All REACTOS</h1>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Week</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Reacto</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 1</Table.Cell>
                <Table.Cell>Date 1</Table.Cell>
                <Table.Cell>Reacto 1</Table.Cell>
              </Table.Row>
              <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 2</Table.Cell>
                <Table.Cell>Date 2</Table.Cell>
                <Table.Cell>Reacto 2</Table.Cell>
              </Table.Row>
              <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 3</Table.Cell>
                <Table.Cell>Date 3</Table.Cell>
                <Table.Cell>Reacto 3</Table.Cell>
              </Table.Row>
              <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 4</Table.Cell>
                <Table.Cell>Date 4</Table.Cell>
                <Table.Cell>Reacto 4</Table.Cell>
              </Table.Row>
                <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 5</Table.Cell>
                <Table.Cell>Date 5</Table.Cell>
                <Table.Cell>Reacto 5</Table.Cell>
              </Table.Row>
              <Table.Row onClick={(evt) => this.handleClick(evt)}>
                <Table.Cell>Week 6</Table.Cell>
                <Table.Cell>Date 6</Table.Cell>
                <Table.Cell>Reacto 6</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
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

export default connect(mapState, mapDispatch)(AllReactos)
