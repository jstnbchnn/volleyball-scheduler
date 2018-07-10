import React, { Component, Fragment } from 'react';
import { Transition, animated } from 'react-spring';
import styled from 'styled-components';

class Standings extends Component {

  renderStandings = () => {
    return this.props.standings.map((team, idx) => styles => {
      return (
        <animated.li key={`${team.teamName}|${idx}`} style={{ ...defaultStyles, ...styles }}>
          {team.teamName}
        </animated.li>
      )
    })
  }

  render () {
    return (
      <Fragment>
        <Title>{`Standings for ${this.props.selectedDivision}`}</Title>
        <ol>
          <Transition
            native
            keys={this.props.standings.map(team => team.teamName)}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 30 }}
            leave={{ opacity: 0 }}
          >
            {this.renderStandings()}
          </Transition>
        </ol>
      </Fragment>
    )
  }
}

const defaultStyles = {
  margin: '10px',
}

const Title = styled.span`
  font-size: 1.3rem;
`

export default Standings