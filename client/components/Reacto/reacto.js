import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Dimmer, Loader, Card, Container, Icon, Header} from 'semantic-ui-react'
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
            <Card.Group>
            {reactos.map(reacto => {
              return (
                <Card fluid color='red' key={reacto.id}>
                  <Header>{reacto.name}</Header>
                </Card>
              )
            }
            )}
            </Card.Group>
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
