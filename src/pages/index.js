import React, { Component, Fragment } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

import Header from '../components/header';
import { Schedule } from '../components/Schedule';
import Loader from '../components/Loader';
import Select from '../components/Select';

class App extends Component {
  state = {
    divisions: [],
    teams: [],
    futureGames: null,
    selectedDivision: '',
    selectedTeam: '',
    pastGames: null,
    isLoading: true,
    showSchedule: true,
  }

  async componentDidMount() {
    const { data: divisions } = await axios.get(process.env.API_BASE_URL);

    const constructedDivisions = divisions.reduce((acc, division) => {
      const { id, name } = division;

      return [...acc, { value: id, label: name }];
    }, []);

    this.setState({
      divisions: constructedDivisions,
      isLoading: false,
    });
  }

  handleDivisionChange = async selectedDivision => {
    if (selectedDivision === '') {
      this.setState({ selectedDivision });
      return;
    }

    const { data } = await axios.get(
      `${process.env.API_BASE_URL}/division/${selectedDivision.value}`
    );

    const teams = data.reduce((acc, team) => {
      const { id, name } = team;

      return [...acc, { value: id, label: name }];
    }, []);

    this.setState({
      selectedDivision,
      teams,
      futureGames: null,
      selectedTeam: '',
    });
  }

  handleTeamChange = async selectedTeam => {
    if (!selectedTeam) {
      this.setState({ selectedTeam });
      return;
    }

    const { selectedDivision } = this.state;

    const {
      data: { futureGames, pastGames },
    } = await axios.get(
      `${process.env.API_BASE_URL}/teams?teamId=${
        selectedTeam.value
      }&divisionId=${selectedDivision.value}`
    );

    this.setState({
      selectedTeam,
      futureGames,
      pastGames,
    });
  }

  render() {
    const {
      isLoading,
      selectedDivision,
      divisions,
      selectedTeam,
      teams,
      futureGames,
    } = this.state;

    return (
      <Fragment>
        <Header siteTitle="VBall Schedule" />
        <Wrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <Options>
              <Select
                name="divison-select"
                value={selectedDivision}
                onChange={this.handleDivisionChange}
                options={divisions}
                label="Divisions"
              />
              <Select
                name="team-select"
                value={selectedTeam}
                onChange={this.handleTeamChange}
                options={teams}
                label="Teams"
                disabled={teams.length === 0}
              />
            </Options>
          )}
          <Schedule
            title="Upcomming Games"
            team={selectedTeam.label}
            games={futureGames}
          />
        </Wrapper>
      </Fragment>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const show = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1
  }
`;

const Options = styled.div`
  padding-bottom: 20px;
  animation: ${show} 0.5s ease-in;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

export default App;
