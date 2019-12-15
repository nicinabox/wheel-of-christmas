import { combineReducers } from 'redux'
import games, { GamesState } from './games'
import currentGame, { CurrentGameState } from './currentGame'
import currentRound, { CurrentRoundState } from './currentRound'
import currentSound, { CurrentSoundState } from './currentSound'
import secondarySound, { SecondarySoundState } from './secondarySound'

export type RootState = {
  games: GamesState,
  currentSound: CurrentSoundState,
  secondarySound: SecondarySoundState,
  currentGame: CurrentGameState,
  currentRound: CurrentRoundState,
}

const reducers = combineReducers({
  games,
  currentGame,
  currentRound,
  currentSound,
  secondarySound,
})

export default reducers
