import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Schedule from '../components/Schedule';
import Standings from '../components/Standings';
import Loader from '../components/Loader';

class App extends Component {

  state = {
    divisions: [],
    teams: [],
    selectedDivision: '',
    selectedTeam: '',
    futureGames: null,
    pastGames: null,
    standingsData: null,
    isLoading: true
  }

  async componentDidMount() {

    const { data: divisions } = await axios.get(process.env.API_BASE_URL)

    const constructedDivisions = divisions.reduce((acc, division) => {
      const { id, name } = division

      return [
        ...acc,
        { value: id, label: name }
      ]
    }, [])

      this.setState({
        divisions: constructedDivisions,
        isLoading: false
      })

  }

  handleDivisionChange = async (selectedDivision) => {

    const { data } = await axios.get(`${process.env.API_BASE_URL}/division/${selectedDivision.value}`)

    const teams = data.reduce((acc, team) => {
      const { id, name } = team

      return [
        ...acc,
        { value: id, label: name}
      ]
    }, [])

    this.setState({
      selectedDivision,
      teams,
      futureGames: [],
      pastGames: [],
      selectedTeam: null
    })
  }

  handleTeamChange = async (selectedTeam) => {
    if (!selectedTeam) {
      this.setState({ selectedTeam })
      return
    }

    const { selectedDivision } = this.state

    const schedulePromise =
      axios.get(`${process.env.API_BASE_URL}/teams?teamId=${selectedTeam.value}&divisionId=${selectedDivision.value}`)

    const standingsPromise =
      axios.get(`${process.env.API_BASE_URL}/standings?divisionId=${selectedDivision.value}`)

    const [ { data: { futureGames, pastGames }}, { data: standingsData }] =
      await Promise.all([ schedulePromise, standingsPromise ])

    this.setState({
      selectedTeam,
      futureGames,
      pastGames,
      standingsData
    })
  }

  render() {
    const { selectedDivision, selectedTeam } = this.state

    return (
      <Wrapper>
        {this.state.isLoading ? <Loader/> :
          <Navigation>
            <WrappedSelect
              name="division-select"
              value={selectedDivision}
              onChange={this.handleDivisionChange}
              options={this.state.divisions}
            />
            <WrappedSelect
              name="team-select"
              value={selectedTeam}
              onChange={this.handleTeamChange}
              options={this.state.teams}
              disabled={this.state.teams.length === 0}
            />
          </Navigation>
        }
        {this.state.selectedTeam &&
          <Fragment>
            <Schedule
              upcomming
              title="Upcomming Games"
              team={this.state.selectedTeam.label}
              games={this.state.futureGames}
            />
            <Standings
              standings={this.state.standingsData}
              selectedDivision={this.state.selectedDivision.label}
            />
          </Fragment>
        }
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const show = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1
  }
`

const Navigation = styled.div`
  padding-bottom: 20px;

  animation: ${show} 0.5s ease-in;
`

const WrappedSelect = styled(Select)`
  margin: 20px;
  width: 350px;
`



export default App;
