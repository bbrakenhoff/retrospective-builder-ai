import { RetrospectiveElementStub } from '../retrospective-element.stub';

export const testRetrospectiveElements: RetrospectiveElementStub[] = [
  // Set the Stage
  {
    id: 'setTheStage1',
    name: 'Sorting Hat Icebreaker',
    theme: 'Harry Potter',
    link: 'https://www.wizardingworld.com/sorting-hat',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['setTheStage'],
    instruction:
      'Ask participants to pick a Hogwarts house and share how it aligns with their sprint experience.',
  },
  {
    id: 'setTheStage2',
    name: 'Taylor Swift Lyric Match',
    theme: 'Music',
    link: 'https://www.taylorswift.com/',
    attendanceOptions: ['Online'],
    phase: ['setTheStage'],
    instruction:
      'Participants pair Taylor Swift lyrics with sprint themes or outcomes.',
  },
  {
    id: 'setTheStage3',
    name: 'Disney Quote Guessing Game',
    theme: 'Disney',
    link: null,
    attendanceOptions: ['Offline'],
    phase: ['setTheStage'],
    instruction:
      'Share famous Disney quotes and ask participants to guess the movie.',
  },
  {
    id: 'setTheStage4',
    name: 'Superhero Alias Icebreaker',
    theme: 'Superheroes',
    link: 'https://www.marvel.com',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['setTheStage'],
    instruction:
      "Ask each participant to choose a superhero alias and share what their 'superpower' was during the sprint.",
  },

  // Gather Data
  {
    id: 'gatherData1',
    name: 'Marauder’s Map Sprint Review',
    theme: 'Harry Potter',
    link: 'https://www.wizardingworld.com/marauders-map',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['gatherData'],
    instruction:
      'Use a visual map to highlight tasks completed, in progress, and blocked.',
  },
  {
    id: 'gatherData2',
    name: 'FLETCHER Playlist Reflection',
    theme: 'Music',
    link: 'https://www.fletchermusic.com',
    attendanceOptions: ['Online'],
    phase: ['gatherData'],
    instruction:
      'Create a playlist of FLETCHER songs to represent team mood and progress.',
  },
  {
    id: 'gatherData3',
    name: 'Favorite Disney Meals Chart',
    theme: 'Food',
    link: 'https://www.disneyfoodblog.com',
    attendanceOptions: ['Offline'],
    phase: ['gatherData'],
    instruction:
      'Team members vote on their favorite Disney-inspired meals to reflect sprint satisfaction.',
  },
  {
    id: 'gatherData4',
    name: 'Zombie Apocalypse Status Map',
    theme: 'Apocalyptic Survival',
    link: null,
    attendanceOptions: ['Online', 'Offline'],
    phase: ['gatherData'],
    instruction:
      "Team members describe tasks as 'safe zones' (completed), 'zombie-infested' (blocked), or 'survivable' (in progress).",
  },

  // Generate Insights
  {
    id: 'generateInsights1',
    name: 'Ed Sheeran Lyric Association',
    theme: 'Music',
    link: 'https://www.edsheeran.com',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['generateInsights'],
    instruction:
      'Match Ed Sheeran lyrics to the team’s challenges and achievements.',
  },
  {
    id: 'generateInsights2',
    name: 'Horcrux Problem-Solving',
    theme: 'Harry Potter',
    link: 'https://www.wizardingworld.com/horcrux',
    attendanceOptions: ['Offline'],
    phase: ['generateInsights'],
    instruction:
      "Break down 'Horcrux-like' tasks that feel overwhelming into manageable pieces.",
  },
  {
    id: 'generateInsights3',
    name: 'Disney Hero vs. Villain Analysis',
    theme: 'Disney',
    link: 'https://www.disney.com',
    attendanceOptions: ['Online'],
    phase: ['generateInsights'],
    instruction:
      'Discuss team behaviors as heroic or villainous in achieving sprint goals.',
  },
  {
    id: 'generateInsights4',
    name: 'Escape Room Puzzle',
    theme: 'Escape Room',
    link: 'https://www.escaperooms.com',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['generateInsights'],
    instruction:
      "Frame the sprint as an escape room. Discuss what 'clues' (tools/techniques) worked, which 'locks' (challenges) slowed progress, and what 'breakthroughs' (solutions) led to success.",
  },

  // Decide What To Do
  {
    id: 'decideWhatToDo1',
    name: 'Butterbeer Planning Session',
    theme: 'Harry Potter',
    link: 'https://www.wizardingworld.com/recipes',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['decideWhatToDo'],
    instruction:
      "Plan actionable tasks over a virtual 'Butterbeer toast' session.",
  },
  {
    id: 'decideWhatToDo2',
    name: 'Red (Taylor’s Version) Action Items',
    theme: 'Music',
    link: 'https://www.taylorswift.com',
    attendanceOptions: ['Online'],
    phase: ['decideWhatToDo'],
    instruction:
      "Identify sprint actions aligned with the emotional tone of Taylor Swift’s 'Red' album.",
  },
  {
    id: 'decideWhatToDo3',
    name: 'Disney Dream Plan',
    theme: 'Disney',
    link: 'https://www.disney.com',
    attendanceOptions: ['Offline'],
    phase: ['decideWhatToDo'],
    instruction:
      'Design a dream roadmap inspired by Disney stories and characters.',
  },
  {
    id: 'decideWhatToDo4',
    name: 'Pirate Treasure Hunt Planning',
    theme: 'Pirates',
    link: 'https://www.piratefest.com',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['decideWhatToDo'],
    instruction:
      "Define key action items as 'treasure map routes' and prioritize them based on 'hidden gold' (value).",
  },

  // Closing
  {
    id: 'closing1',
    name: 'House Cup Awards',
    theme: 'Harry Potter',
    link: 'https://www.wizardingworld.com/house-cup',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['closing'],
    instruction:
      "Award 'house points' for the most impactful contributions during the sprint.",
  },
  {
    id: 'closing2',
    name: 'Ed Sheeran ‘Perfect’ Recap',
    theme: 'Music',
    link: 'https://www.edsheeran.com',
    attendanceOptions: ['Online'],
    phase: ['closing'],
    instruction:
      "Summarize the sprint by playing 'Perfect' and highlighting team successes.",
  },
  {
    id: 'closing3',
    name: 'Disney Fireworks Finale',
    theme: 'Disney',
    link: 'https://www.disney.com/fireworks',
    attendanceOptions: ['Offline'],
    phase: ['closing'],
    instruction:
      "End the retrospective with a metaphorical 'fireworks display' of team achievements.",
  },
  {
    id: 'closing4',
    name: 'Outer Space Launch Party',
    theme: 'Space Exploration',
    link: 'https://www.nasa.gov',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['closing'],
    instruction:
      "Celebrate the sprint as a successful space launch. Team members share one 'mission highlight' (success) and one 'system upgrade' (improvement suggestion) for the next mission.",
  },
];
