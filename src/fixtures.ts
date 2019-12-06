import API from "interfaces/api";

export const GAME_FIXTURE: API.Game[] = [
  {
    id: 1,
    puzzles: [
      {
        id: 1,
        category: 'fictional_character',
        phrase: "  DR.       FRANKENSTEIN'S ASSISTANT          IGOR",
        name: null,
        bonus_round: false,
      },
      {
        id: 2,
        category: 'classic_movie',
        phrase: '             CITIZEN KANE',
        name: null,
        bonus_round: false,
      },
      {
        id: 3,
        category: 'song_artist',
        phrase: '               AFRICA         BY TOTO',
        name: null,
        bonus_round: false,
      },
      {
        id: 4,
        category: 'movie_quotes',
        phrase: '             YOU SHALL       NOT PASS!',
        name: null,
        bonus_round: false,
      },
      {
        id: 5,
        category: "the_90_s",
        phrase: '               BEEPERS',
        name: null,
        bonus_round: false,
      },
    ]
  }
]
