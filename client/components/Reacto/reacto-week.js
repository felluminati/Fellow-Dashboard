import React from 'react'
import {Container, Table, Button, Dropdown, Dimmer, Loader} from 'semantic-ui-react'
import { getFellowsThunk, updateCalendarThunk, getReactosThunk, getCalendarThunk} from '../../store'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment'

class ReactoWeek extends React.Component {
  async componentDidMount() {
    await this.props.getFellows()
    // await this.props.getReactos()
    await this.props.getCalendar()
  }

  handleChange = (evt) => {
    const fellow = this.props.fellows.filter(curFellow => curFellow.name === evt.target.innerText)[0]
    const {id, name, startDate} = evt.event
    this.props.updateCalendar({
      id,
      name,
      startDate,
      fellow
    })
  }

  render() {
    const {fellowDropdown, calendar, week} = this.props
    if(!calendar.length){
        return (
          <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        )
    } else {
    const weekTopic = (calendar.find(event => event.weekId === week)).
    week.name.split('-').slice(1).join(' ').toUpperCase()
    const calendarWeek = calendar.filter(event => event.weekId === week)
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
              calendarWeek.map(event => {
                const date = event.startDate
                const name = event.reacto.name
                const html = event.reacto.html_url
                const download_url = event.reacto.download_url
                const fellow = event.fellow.name
                const filteredFellows = fellowDropdown.filter(curFellow => curFellow.text !== fellow)
                return (
                  <Table.Row key={event.id}>
                    <Table.Cell>{moment(date).format('MM/DD/YYYY')}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    {/* <Table.Cell><a href={html} style={{color: "white"}}><Button color="blue">Gist</Button></a></Table.Cell> */}
                    <Table.Cell><Link to={`/reacto/markdown/${name}`}><Button color="blue">Gist</Button></Link></Table.Cell>
                    <Table.Cell>{fellow}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder='Assign to another fellow'
                        search selection options={filteredFellows}
                        onChange={(evt) => {
                          evt.event = event
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
}

const mapStateToProps = (state) => {
  // const week = window.location.pathname.split('/')[3]
  // const reactos = state.reactos.filter(reacto => +reacto.week === +week)
  // const weekTopic = state.reactos[0].week_topic.name.split('-').slice(1).join(' ').toUpperCase()
  const calendar = state.calendar
 // const reactos = state.reactos
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
  //  reactos,
    calendar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFellows: () => dispatch(getFellowsThunk()),
    // getReactos : () => dispatch(getReactosThunk()),
    // updateReacto: (reacto) => dispatch(updateReactoThunk(reacto)),
    updateCalendar: (event) => dispatch(updateCalendarThunk(event)),
    getCalendar: () => dispatch(getCalendarThunk())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactoWeek)
