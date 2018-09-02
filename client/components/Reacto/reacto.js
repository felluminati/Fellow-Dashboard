import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Dimmer, Loader, Card, Container, Table, Button} from 'semantic-ui-react'
import { getReactosThunk, getCalendarThunk, getCohortsThunk} from '../../store'
import moment from 'moment'

class Reacto extends React.Component {
  constructor(){
    super()
  }

  async componentDidMount() {
    await this.props.getReactosThunk()
    await this.props.getCalendarThunk()
  //  await this.props.getCohortsThunk()
  // Keeping it commented out. Still need to figure out what can we use from the
  // learndot api
  //
  }

  render(){
      const {reactos} = this.props
      console.log('reactos in this component ', reactos)
      if(!reactos.length){
          return (
            <Dimmer active>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
          )
      } else {
        return (
          <Container>
            <Table celled striped collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Reacto Name</Table.HeaderCell>
                  <Table.HeaderCell>Reacto Gist</Table.HeaderCell>
                  <Table.HeaderCell>Fellow</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  reactos.map(reacto => {
                    const date = reacto.date_assigned.startDate
                    const name = reacto.name
                    const html = reacto.htmlUrl
                    const fellow = reacto.fellow.name
                    return (
                      <Table.Row key={reacto.id}>
                        <Table.Cell>{date}</Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell><a href={html} style={{color: "white"}}><Button color="blue">Gist</Button></a></Table.Cell>
                        <Table.Cell>{fellow}</Table.Cell>
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

const mapStateToProps = state => {
  return {
    user: state.user,
    reactos: state.reactos,
    calendar: state.calendar,
    cohort: state.cohort
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReactosThunk : () => dispatch(getReactosThunk()),
    getCalendarThunk: () => dispatch(getCalendarThunk()),
    getCohortsThunk: () => dispatch(getCohortsThunk())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Reacto)



/**
 * Samir's Reacto Component
 *
 *         return(
          <Container>
            <Card.Group>
            {reactos.map(reacto => {
              return (
                <Card fluid color='red' key={reacto.id}>
                  <Header>{reacto.name}</Header>
                  <a href={reacto.html_url}>
                    Link to Github <Icon name="github" />
                  </a>
                </Card>
              )
            }
            )}
            </Card.Group>
            {calendar.map(event => {
              return (
                <Card fluid color='red' key={event.id}>
                  <Header>{event.summary}  -  {moment(event.start.dateTime).format('MM/DD/YYYY')}
                  </Header>
                  <a href={event.htmlLink}>
                    Link to Google Calendar <Icon name="google" />
                  </a>
                </Card>
              )
            }
            )}
            <button onClick={this.printCohorts}> Test </button>
          </Container>
        )
 */
