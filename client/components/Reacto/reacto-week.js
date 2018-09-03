import React from 'react'
import {Container, Table, Button, Dropdown} from 'semantic-ui-react'
import { getFellowsThunk, updateReactoThunk, getReactosThunk} from '../../store'
import { connect } from 'react-redux';


class ReactoWeek extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.getFellows()
    await this.props.getReactos()
  }

  handleChange = (evt) => {
    const chosenFellow = evt.target.innerText
    const fellowData = this.props.fellows.filter(fellow => fellow.name === chosenFellow)[0]
    const chosenReacto = evt.reacto
    const {id, name, htmlUrl, week} = chosenReacto
    this.props.updateReacto({
      id,
      name,
      htmlUrl,
      week,
      fellow: fellowData
    })
  }

  render() {
    const {reactos, week, fellows} = this.props
    const weekReactos = reactos.filter(reacto => reacto.week === week)
    const weekTopic = reactos[0].week_topic.name.split('-').slice(1).join(' ').toUpperCase()
    const fellowOptions = fellows.map(fellow => {
      return {
        key: fellow.id,
        text: fellow.name
      }
    })
    return (
      <Container>
        <h1>WEEK {week}: {weekTopic}</h1>
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
              weekReactos.map(reacto => {
                const date = reacto.date_assigned.startDate
                const name = reacto.name
                const html = reacto.htmlUrl
                const fellow = reacto.fellow.name
                const filteredFellows = fellowOptions.filter(curFellow => curFellow.text !== fellow)
                return (
                  <Table.Row key={reacto.id}>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell><a href={html} style={{color: "white"}}><Button color="blue">Gist</Button></a></Table.Cell>
                    <Table.Cell>{fellow}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder='Choose Fellow'
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

const mapStateToProps = ({fellows, reactos}) => {
  return {
    fellows,
    reactos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFellows: () => dispatch(getFellowsThunk()),
    updateReacto: (reacto) => dispatch(updateReactoThunk(reacto)),
    getReactos : () => dispatch(getReactosThunk()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactoWeek)
