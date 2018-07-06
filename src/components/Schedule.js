import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

class Schedule extends Component {

  render () {
    if (Object.keys(this.props.games).length === 0) {
      return <div key='beans'>Currently no upcomming games.</div>
    }

    return (
      <Fragment>
        <Title>{`${this.props.title} for ${this.props.team}`}</Title>
        <ScheduleWrapper upcomming={this.props.upcomming}>
          {Object.keys(this.props.games).map(date => {

            return (
              <div>
                <DateLabel>{format(date, 'MMMM Do')}</DateLabel>
                <ScheduleItems upcomming={this.props.upcomming}>
                  {this.props.games[date].map(game => <ScheduleItem game={game} />)}
                </ScheduleItems>
              </div>
            )
          })}
        </ScheduleWrapper>
      </Fragment>
    );
  }
}

const ScheduleItem = (props) => {
  const { game } = props;

  return (
    <Game>
      <div>Court {game.playingSurface} at {game.time}</div>
      <div>{game.competitor1} vs {game.competitor2}</div>
    </Game>
  )
}

const DateLabel = styled.div`
  font-size: 1.1rem;
  padding: 5px;
  text-align: center;
`

const Title = styled.span`
  font-size: 1.3rem;
`

const ScheduleItems = styled.div`
  display: flex;
  flex-direction: ${props => props.upcomming ? 'column' : 'row'};
  align-items: center;
  padding: 0 20px;
`

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.upcomming ? 'row' : 'column'}
  padding-top: 20px;
`

const Game = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`

export default Schedule;