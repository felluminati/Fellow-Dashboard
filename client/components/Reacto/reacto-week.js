import React from 'react'
import {Container, Table, Button} from 'semantic-ui-react'

function filterReacto(reactos) {
  const week = window.location.pathname.split('/')[3]
  return reactos.filter(reacto => reacto.week === +week)
}

export const ReactoWeek = (props) => {
  const reactos = filterReacto(props.reactos)
  const weekNum = reactos[0].week_topic.num
  const weekTopic = reactos[0].week_topic.name.split('-').slice(1).join(' ').toUpperCase()
  return (
    <Container>
      <h1>WEEK {weekNum}: {weekTopic}</h1>
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
