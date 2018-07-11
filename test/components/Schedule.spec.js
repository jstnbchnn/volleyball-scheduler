import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, getByText } from 'react-testing-library';
import { Schedule } from '../../src/components/Schedule';

describe('Schedule Component', () => {
  test('displays nothing when given no games', () => {

    const { queryByText } = render(
      <Schedule
        title="Upcomming Games"
        team="The TurkenDurkens"
        games={null}
      />
    );

    expect(queryByText('Currently no upcomming games.')).toBeNull();
  });

  test('displays a message when no games are scheduled', () => {
    const { container, queryByText } = render(
      <Schedule
        title="Upcomming Games"
        team="The TurkenDurkens"
        games={[]}
      />
    );

    const message = getByText(container, 'Currently no upcomming games.');
    expect(message).not.toBeNull();

    // const teamGreeting = queryByText(container, 'Upcomming Games for The TurkenDurkens')
    expect(queryByText('Upcomming Games for The TurkenDurkens')).toBeNull();
  });

  test('displays games', () => {
    const { queryByText } = render(
      <Schedule
        title="Upcomming Games"
        team="The TurkenDurkens"
        games={games}
      />
    );


    expect(queryByText('Upcomming Games for The TurkenDurkens')).not.toBeNull();
  });
});


const games = {
  'Thursday, July 12, 2018': [
    {
      'playingSurface': '8',
      'division': 'Thursday 4\'s Semi-Competitive (early)',
      'datetimesort': '201807121830',
      'date': '7/12/2018',
      'longdate': 'Thursday, July 12, 2018',
      'time': '6:30 PM',
      'winner': null,
      'competitor1': 'Sand Ninjas',
      'competitor2': 'Block Obamas',
      'sets': []
    },
    {
      'playingSurface': '9',
      'division': 'Thursday 4\'s Semi-Competitive (early)',
      'datetimesort': '201807121910',
      'date': '7/12/2018',
      'longdate': 'Thursday, July 12, 2018',
      'time': '7:10 PM',
      'winner': null,
      'competitor1': 'Beerff',
      'competitor2': 'Sand Ninjas',
      'sets': []
    },
    {
      'playingSurface': '8',
      'division': 'Thursday 4\'s Semi-Competitive (early)',
      'datetimesort': '201807121950',
      'date': '7/12/2018',
      'longdate': 'Thursday, July 12, 2018',
      'time': '7:50 PM',
      'winner': null,
      'competitor1': 'MIND BLOCKS',
      'competitor2': 'Sand Ninjas',
      'sets': []
    }
  ]
};
