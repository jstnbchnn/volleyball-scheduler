import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class Standings extends Component {

  renderStandings = () => {
    return this.props.standings.map(team => {
      return <li>{team.teamName}</li>
    })
  }

  render () {
    console.log(['this.props', this.props.standings]);
    return (
      <Fragment>
        <Title>{`Standings for ${this.props.selectedDivision}`}</Title>
        <ol>
          {this.renderStandings()}
        </ol>
      </Fragment>
    )
  }
}

const Title = styled.span`
  font-size: 1.3rem;
`

export default Standings