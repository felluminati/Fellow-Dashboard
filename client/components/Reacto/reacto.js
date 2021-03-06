import React from 'react'
import { connect } from 'react-redux';
import {NavLink, Route} from 'react-router-dom'
import {Dimmer, Loader, Grid, Menu} from 'semantic-ui-react'
import { getReactosThunk, getCalendarThunk, getCohortsThunk} from '../../store'
import {ReactoWeek} from '../index'


class Reacto extends React.Component {
  constructor(){
    super()
  }

  async componentDidMount() {
    await this.props.getReactosThunk()
  }

  render(){
      const {reactos} = this.props
      if(!reactos.length){
          return (
            <Dimmer active>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
          )
      } else {
        return (
          <div id="reacto-dashboard">
            <h1>Reactos</h1>
            <br />
            <Grid>
              <Grid.Column width={4}>
                <div id="dashboard-menu">
                  <Menu fluid vertical>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/1">Week One</Menu.Item>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/2">Week Two</Menu.Item>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/3">Week Three</Menu.Item>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/4">Week Four</Menu.Item>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/5">Week Five</Menu.Item>
                    <Menu.Item as={NavLink} color="blue" to="/reacto/week/6">Week Six</Menu.Item>
                  </Menu>
                </div>
              </Grid.Column>
              <Grid.Column stretched width={12}>
                <div id="dashboard-left">
                  <Route exact path="/reacto/week/1" render={()=><ReactoWeek week={1} />}></Route>
                  <Route exact path="/reacto/week/2" render={()=><ReactoWeek week={2} />}></Route>
                  <Route exact path="/reacto/week/3" render={()=><ReactoWeek week={3} />}></Route>
                  <Route exact path="/reacto/week/4" render={()=><ReactoWeek week={4} />}></Route>
                  <Route exact path="/reacto/week/5" render={()=><ReactoWeek week={5} />}></Route>
                  <Route exact path="/reacto/week/6" render={()=><ReactoWeek week={6} />}></Route>
                  <Route exact path="/reacto" render={() => <h1>Please select a week</h1>}></Route>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        )
      }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    reactos: state.reactos,
    // calendar: state.calendar,
    // cohort: state.cohort
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReactosThunk : () => dispatch(getReactosThunk()),
    // getCalendarThunk: () => dispatch(getCalendarThunk()),
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
