import React from 'react'
import {Container, Table, Button, Dropdown} from 'semantic-ui-react'

export const ReactoWeek = ({reactos, week}) => {
  const weekReactos = reactos.filter(reacto => reacto.week === week)
  const weekTopic = reactos[0].week_topic.name.split('-').slice(1).join(' ').toUpperCase()
  const fellowOptions = [
    {
      text: "Jasmine"
    },
    {
      text: "Samir"
    },
    {
      text: "Mary"
    }
  ]
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
              return (
                <Table.Row key={reacto.id}>
                  <Table.Cell>{date}</Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell><a href={html} style={{color: "white"}}><Button color="blue">Gist</Button></a></Table.Cell>
                  <Table.Cell>{fellow}</Table.Cell>
                  <Table.Cell><Dropdown placeholder='Choose Fellow' search selection options={fellowOptions} /></Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </Container>
  )
}
