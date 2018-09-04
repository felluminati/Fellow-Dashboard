import React from 'react'
import {Container, Table, Button, Dropdown} from 'semantic-ui-react'
import { getFellowsThunk, updateReactoThunk, getReactosThunk} from '../../store'
import { connect } from 'react-redux';

class ReactoWeek extends React.Component {
  async componentDidMount() {
    await this.props.getFellows()
    await this.props.getReactos()
  }

  handleChange = (evt) => {
    const fellow = this.props.fellows.filter(curFellow => curFellow.name === evt.target.innerText)[0]
    const {id, name, htmlUrl, week} = evt.reacto
    this.props.updateReacto({
      id,
      name,
      htmlUrl,
      week,
      fellow
    })
  }

  render() {
    const {reactos, fellowDropdown, weekTopic, week} = this.props
    return (
      <Container>
        <h2>WEEK {week}: {weekTopic}</h2>
        <Table celled striped collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Reacto Name</Table.HeaderCell>
              <Table.HeaderCell>Reacto Gist</Table.HeaderCell>
              <Table.HeaderCell>Fellow</Table.HeaderCell>
              <Table.HeaderCell>Edit Fellow</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              reactos.map(reacto => {
                const date = reacto.date_assigned.startDate
                const name = reacto.name
                const html = reacto.htmlUrl
                const fellow = reacto.fellow.name
                const filteredFellows = fellowDropdown.filter(curFellow => curFellow.text !== fellow)
                return (
                  <Table.Row key={reacto.id}>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell><a href={html} style={{color: "white"}}><Button color="blue">Gist</Button></a></Table.Cell>
                    <Table.Cell>{fellow}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder='Assign to another fellow'
                        search selection options={filteredFellows}
                        onChange={(evt) => {
                          evt.reacto = reacto
                          this.handleChange(evt)
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const week = window.location.pathname.split('/')[3]
  const reactos = state.reactos.filter(reacto => +reacto.week === +week)
  const weekTopic = state.reactos[0].week_topic.name.split('-').slice(1).join(' ').toUpperCase()
  const fellows = state.fellows
  const fellowDropdown = fellows.map(fellow => {
    return {
      key: fellow.id,
      text: fellow.name
    }
  })
  return {
    fellows,
    fellowDropdown,
    reactos,
    weekTopic
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFellows: () => dispatch(getFellowsThunk()),
    getReactos : () => dispatch(getReactosThunk()),
    updateReacto: (reacto) => dispatch(updateReactoThunk(reacto)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactoWeek)
