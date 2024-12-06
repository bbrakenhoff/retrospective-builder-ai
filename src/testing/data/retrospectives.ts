import { RetrospectiveStub } from '../retrospective.stub';

export const testRetrospectives: RetrospectiveStub[] = [
  // Retrospective 1: All 5 phases filled
  {
    id: 'retrospective1-full',
    sprint: 'Sprint 1',
    team: 'Team Gryffindor',
    date: '2024-12-01',
    url: 'https://retrospective1.com',
    phases: {
      setTheStage: {
        id: 'setTheStage1',
        name: 'Sorting Hat Icebreaker',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/sorting-hat',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['setTheStage'],
        instruction:
          'Ask participants to pick a Hogwarts house and share how it aligns with their sprint experience.',
      },
      gatherData: {
        id: 'gatherData2',
        name: 'FLETCHER Playlist Reflection',
        theme: 'Music',
        link: 'https://www.fletchermusic.com',
        attendanceOptions: ['Online'],
        phase: ['gatherData'],
        instruction:
          'Create a playlist of FLETCHER songs to represent team mood and progress.',
      },
      generateInsights: {
        id: 'generateInsights1',
        name: 'Ed Sheeran Lyric Association',
        theme: 'Music',
        link: 'https://www.edsheeran.com',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['generateInsights'],
        instruction:
          'Match Ed Sheeran lyrics to the team’s challenges and achievements.',
      },
      decideWhatToDo: {
        id: 'decideWhatToDo3',
        name: 'Disney Dream Plan',
        theme: 'Disney',
        link: 'https://www.disney.com',
        attendanceOptions: ['Offline'],
        phase: ['decideWhatToDo'],
        instruction:
          'Design a dream roadmap inspired by Disney stories and characters.',
      },
      closing: {
        id: 'closing1',
        name: 'House Cup Awards',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/house-cup',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['closing'],
        instruction:
          "Award 'house points' for the most impactful contributions during the sprint.",
      },
    },
    createdTime: '2024-12-01T09:00:00Z',
    lastEditedTime: '2024-12-02T10:00:00Z',
  },
  {
    id: 'retrospective1-ref',
    sprint: 'Sprint 1',
    team: 'Team Gryffindor',
    date: '2024-12-01',
    url: 'https://retrospective1.com',
    phases: {
      setTheStage: 'setTheStage1',
      gatherData: 'gatherData2',
      generateInsights: 'generateInsights1',
      decideWhatToDo: 'decideWhatToDo3',
      closing: 'closing1',
    },
    createdTime: '2024-12-01T09:00:00Z',
    lastEditedTime: '2024-12-02T10:00:00Z',
  },

  // Retrospective 2: No phases
  {
    id: 'retrospective2-full',
    sprint: 'Sprint 2',
    team: 'Team Hufflepuff',
    date: null,
    url: 'https://retrospective2.com',
    phases: {
      setTheStage: null,
      gatherData: null,
      generateInsights: null,
      decideWhatToDo: null,
      closing: null,
    },
    createdTime: '2024-12-02T09:00:00Z',
    lastEditedTime: '2024-12-02T12:00:00Z',
  },
  {
    id: 'retrospective2-ref',
    sprint: 'Sprint 2',
    team: 'Team Hufflepuff',
    date: null,
    url: 'https://retrospective2.com',
    phases: {
      setTheStage: null,
      gatherData: null,
      generateInsights: null,
      decideWhatToDo: null,
      closing: null,
    },
    createdTime: '2024-12-02T09:00:00Z',
    lastEditedTime: '2024-12-02T12:00:00Z',
  },

  // Retrospective 3: Missing closing phase
  {
    id: 'retrospective3-full',
    sprint: 'Sprint 3',
    team: 'Team Ravenclaw',
    date: '2024-12-03',
    url: 'https://retrospective3.com',
    phases: {
      setTheStage: {
        id: 'setTheStage2',
        name: 'Taylor Swift Lyric Match',
        theme: 'Music',
        link: 'https://www.taylorswift.com/',
        attendanceOptions: ['Online'],
        phase: ['setTheStage'],
        instruction:
          'Participants pair Taylor Swift lyrics with sprint themes or outcomes.',
      },
      gatherData: {
        id: 'gatherData3',
        name: 'Favorite Disney Meals Chart',
        theme: 'Food',
        link: 'https://www.disneyfoodblog.com',
        attendanceOptions: ['Offline'],
        phase: ['gatherData'],
        instruction:
          'Team members vote on their favorite Disney-inspired meals to reflect sprint satisfaction.',
      },
      generateInsights: {
        id: 'generateInsights4',
        name: 'Escape Room Puzzle',
        theme: 'Escape Room',
        link: 'https://www.escaperooms.com',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['generateInsights'],
        instruction:
          "Frame the sprint as an escape room. Discuss what 'clues' (tools/techniques) worked, which 'locks' (challenges) slowed progress, and what 'breakthroughs' (solutions) led to success.",
      },
      decideWhatToDo: {
        id: 'decideWhatToDo1',
        name: 'Butterbeer Planning Session',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/recipes',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['decideWhatToDo'],
        instruction:
          "Plan actionable tasks over a virtual 'Butterbeer toast' session.",
      },
      closing: null,
    },
    createdTime: '2024-12-03T09:00:00Z',
    lastEditedTime: '2024-12-03T11:00:00Z',
  },
  {
    id: 'retrospective3-ref',
    sprint: 'Sprint 3',
    team: 'Team Ravenclaw',
    date: '2024-12-03',
    url: 'https://retrospective3.com',
    phases: {
      setTheStage: 'setTheStage2',
      gatherData: 'gatherData3',
      generateInsights: 'generateInsights4',
      decideWhatToDo: 'decideWhatToDo1',
      closing: null,
    },
    createdTime: '2024-12-03T09:00:00Z',
    lastEditedTime: '2024-12-03T11:00:00Z',
  },

  // Retrospective 4: Missing setTheStage phase
  {
    id: 'retrospective4-full',
    sprint: 'Sprint 4',
    team: 'Team Slytherin',
    date: '2024-12-04',
    url: 'https://retrospective4.com',
    phases: {
      setTheStage: null,
      gatherData: {
        id: 'gatherData1',
        name: 'Marauder’s Map Sprint Review',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/marauders-map',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['gatherData'],
        instruction:
          'Use a visual map to highlight tasks completed, in progress, and blocked.',
      },
      generateInsights: {
        id: 'generateInsights2',
        name: 'Horcrux Problem-Solving',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/horcrux',
        attendanceOptions: ['Offline'],
        phase: ['generateInsights'],
        instruction:
          "Break down 'Horcrux-like' tasks that feel overwhelming into manageable pieces.",
      },
      decideWhatToDo: {
        id: 'decideWhatToDo4',
        name: 'Pirate Treasure Hunt Planning',
        theme: 'Pirates',
        link: 'https://www.piratefest.com',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['decideWhatToDo'],
        instruction:
          "Define key action items as 'treasure map routes' and prioritize them based on 'hidden gold' (value).",
      },
      closing: {
        id: 'closing2',
        name: 'Ed Sheeran ‘Perfect’ Recap',
        theme: 'Music',
        link: 'https://www.edsheeran.com',
        attendanceOptions: ['Online'],
        phase: ['closing'],
        instruction:
          "Summarize the sprint by playing 'Perfect' and highlighting team successes.",
      },
    },
    createdTime: '2024-12-04T09:00:00Z',
    lastEditedTime: '2024-12-04T11:00:00Z',
  },
  {
    id: 'retrospective4-ref',
    sprint: 'Sprint 4',
    team: 'Team Slytherin',
    date: '2024-12-04',
    url: 'https://retrospective4.com',
    phases: {
      setTheStage: null,
      gatherData: 'gatherData1',
      generateInsights: 'generateInsights2',
      decideWhatToDo: 'decideWhatToDo4',
      closing: 'closing2',
    },
    createdTime: '2024-12-04T09:00:00Z',
    lastEditedTime: '2024-12-04T11:00:00Z',
  },

  // Retrospective 5: Missing generateInsights phase
  {
    id: 'retrospective5-full',
    sprint: 'Sprint 5',
    team: 'Team Lumos',
    date: null,
    url: 'https://retrospective5.com',
    phases: {
      setTheStage: {
        id: 'setTheStage3',
        name: 'Disney Quote Guessing Game',
        theme: 'Disney',
        link: 'https://www.disney.com',
        attendanceOptions: ['Offline'],
        phase: ['setTheStage'],
        instruction:
          'Share famous Disney quotes and ask participants to guess the movie.',
      },
      gatherData: {
        id: 'gatherData4',
        name: 'Zombie Apocalypse Status Map',
        theme: 'Apocalyptic Survival',
        link: null,
        attendanceOptions: ['Online', 'Offline'],
        phase: ['gatherData'],
        instruction:
          "Team members describe tasks as 'safe zones' (completed), 'zombie-infested' (blocked), or 'survivable' (in progress).",
      },
      generateInsights: null,
      decideWhatToDo: {
        id: 'decideWhatToDo2',
        name: 'Red (Taylor’s Version) Action Items',
        theme: 'Music',
        link: 'https://www.taylorswift.com',
        attendanceOptions: ['Online'],
        phase: ['decideWhatToDo'],
        instruction:
          "Identify sprint actions aligned with the emotional tone of Taylor Swift’s 'Red' album.",
      },
      closing: {
        id: 'closing3',
        name: 'Disney Fireworks Finale',
        theme: 'Disney',
        link: 'https://www.disney.com/fireworks',
        attendanceOptions: ['Offline'],
        phase: ['closing'],
        instruction:
          "End the retrospective with a metaphorical 'fireworks display' of team achievements.",
      },
    },
    createdTime: '2024-12-05T09:00:00Z',
    lastEditedTime: '2024-12-05T11:00:00Z',
  },
  {
    id: 'retrospective5-ref',
    sprint: 'Sprint 5',
    team: 'Team Lumos',
    date: null,
    url: 'https://retrospective5.com',
    phases: {
      setTheStage: 'setTheStage3',
      gatherData: 'gatherData4',
      generateInsights: null,
      decideWhatToDo: 'decideWhatToDo2',
      closing: 'closing3',
    },
    createdTime: '2024-12-05T09:00:00Z',
    lastEditedTime: '2024-12-05T11:00:00Z',
  },

  // Retrospective 6: Missing gatherData phase
  {
    id: 'retrospective6-full',
    sprint: 'Sprint 6',
    team: 'Team Patronus',
    date: '2024-12-06',
    url: 'https://retrospective6.com',
    phases: {
      setTheStage: {
        id: 'setTheStage4',
        name: 'Superhero Alias Icebreaker',
        theme: 'Superheroes',
        link: 'https://www.marvel.com',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['setTheStage'],
        instruction:
          "Ask each participant to choose a superhero alias and share what their 'superpower' was during the sprint.",
      },
      gatherData: null,
      generateInsights: {
        id: 'generateInsights3',
        name: 'Disney Hero vs. Villain Analysis',
        theme: 'Disney',
        link: 'https://www.disney.com',
        attendanceOptions: ['Online'],
        phase: ['generateInsights'],
        instruction:
          'Discuss team behaviors as heroic or villainous in achieving sprint goals.',
      },
      decideWhatToDo: {
        id: 'decideWhatToDo2',
        name: 'Red (Taylor’s Version) Action Items',
        theme: 'Music',
        link: 'https://www.taylorswift.com',
        attendanceOptions: ['Online'],
        phase: ['decideWhatToDo'],
        instruction:
          "Identify sprint actions aligned with the emotional tone of Taylor Swift’s 'Red' album.",
      },
      closing: {
        id: 'closing4',
        name: 'Outer Space Launch Party',
        theme: 'Space Exploration',
        link: 'https://www.nasa.gov',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['closing'],
        instruction:
          "Celebrate the sprint as a successful space launch. Team members share one 'mission highlight' (success) and one 'system upgrade' (improvement suggestion) for the next mission.",
      },
    },
    createdTime: '2024-12-06T09:00:00Z',
    lastEditedTime: '2024-12-06T11:00:00Z',
  },
  {
    id: 'retrospective6-ref',
    sprint: 'Sprint 6',
    team: 'Team Patronus',
    date: '2024-12-06',
    url: 'https://retrospective6.com',
    phases: {
      setTheStage: 'setTheStage4',
      gatherData: null,
      generateInsights: 'generateInsights3',
      decideWhatToDo: 'decideWhatToDo2',
      closing: 'closing4',
    },
    createdTime: '2024-12-06T09:00:00Z',
    lastEditedTime: '2024-12-06T11:00:00Z',
  },

  // Retrospective 7: Missing decideWhatToDo phase
  {
    id: 'retrospective7-full',
    sprint: 'Sprint 7',
    team: 'Team Accio',
    date: '2024-12-07',
    url: 'https://retrospective7.com',
    phases: {
      setTheStage: {
        id: 'setTheStage3',
        name: 'Disney Quote Guessing Game',
        theme: 'Disney',
        link: 'https://www.disney.com',
        attendanceOptions: ['Offline'],
        phase: ['setTheStage'],
        instruction:
          'Share famous Disney quotes and ask participants to guess the movie.',
      },
      gatherData: {
        id: 'gatherData1',
        name: 'Marauder’s Map Sprint Review',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/marauders-map',
        attendanceOptions: ['Online', 'Offline'],
        phase: ['gatherData'],
        instruction:
          'Use a visual map to highlight tasks completed, in progress, and blocked.',
      },
      generateInsights: {
        id: 'generateInsights2',
        name: 'Horcrux Problem-Solving',
        theme: 'Harry Potter',
        link: 'https://www.wizardingworld.com/horcrux',
        attendanceOptions: ['Offline'],
        phase: ['generateInsights'],
        instruction:
          "Break down 'Horcrux-like' tasks that feel overwhelming into manageable pieces.",
      },
      decideWhatToDo: null,
      closing: {
        id: 'closing3',
        name: 'Disney Fireworks Finale',
        theme: 'Disney',
        link: 'https://www.disney.com/fireworks',
        attendanceOptions: ['Offline'],
        phase: ['closing'],
        instruction:
          "End the retrospective with a metaphorical 'fireworks display' of team achievements.",
      },
    },
    createdTime: '2024-12-07T09:00:00Z',
    lastEditedTime: '2024-12-07T11:00:00Z',
  },
  {
    id: 'retrospective7-ref',
    sprint: 'Sprint 7',
    team: 'Team Accio',
    date: '2024-12-07',
    url: 'https://retrospective7.com',
    phases: {
      setTheStage: 'setTheStage3',
      gatherData: 'gatherData1',
      generateInsights: 'generateInsights2',
      decideWhatToDo: null,
      closing: 'closing3',
    },
    createdTime: '2024-12-07T09:00:00Z',
    lastEditedTime: '2024-12-07T11:00:00Z',
  },
];
