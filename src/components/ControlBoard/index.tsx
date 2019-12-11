import { useDeepEqualEffect } from 'hooks'
import { ReactComponent as ControlsIcon } from 'images/controls.svg'
import { darken } from 'polished'
import React, { useEffect, useState } from 'react'
import NewWindow from 'react-new-window'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Sounds from 'sounds'
import { isPaused, isPlaying, isStopped } from 'sounds'
import { setGameStatus } from 'store/actions/gameActions'
import { highlightChars, setAttemptedLetters, setRevealedIndexes, setVowelsUsed, setPuzzleSolved } from 'store/actions/roundActions'
import { setCurrentSound, setSoundStatus, setSoundVolume } from 'store/actions/soundsActions'
import { RootState } from 'store/reducers'
import { GameStatus } from 'store/reducers/currentGame'
import $ from 'styled-components'
import { getRevealedIndexes, getUnrevealedIndexes, isLastPuzzleVowelUsed, isPuzzleSolved } from 'utils'
import UsedLetterBoard from '../UsedLetterBoard'
import API from 'interfaces/api'


interface ControlBoardProps {}

function getRound(puzzles: API.Puzzle[], index: number): API.Puzzle | undefined  {
  return puzzles[index]
}

function getRoundName(puzzle: API.Puzzle | undefined) {
  if (!puzzle) {
    return ''
  }

  return puzzle.name || `Round ${puzzle.position}`
}

function getPuzzles(puzzles: API.Puzzle[], roundIndex: number) {
  const nextPuzzle = getRound(puzzles, roundIndex + 1)
  const previousPuzzle = getRound(puzzles, roundIndex - 1)
  const currentPuzzle = getRound(puzzles, roundIndex)

  return {
    currentPuzzle,
    nextPuzzle,
    previousPuzzle,
  }
}

const ControlBoard: React.FC<ControlBoardProps> = ({ }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { currentGame, currentRound, currentSound } = useSelector((state: RootState) => state)

  const { phrase, phraseChars, usedChars, highlightedChars, revealedIndexes, attemptedLetters } = currentRound
  const puzzleNumber = currentRound.position

  const {
    currentPuzzle,
    previousPuzzle,
    nextPuzzle
  } = getPuzzles(currentGame.puzzles, currentRound.roundIndex)
  const puzzlesCount = currentGame.puzzles.length

  const nextRoundName = `→ ${getRoundName(nextPuzzle)}`
  const previousRoundName = `← ${getRoundName(previousPuzzle)}`
  const currentRoundName = getRoundName(currentPuzzle)

  const [shouldPopOut, setShouldPopOut] = useState(false)

  useEffect(() => {
    const revealedIndexes = getRevealedIndexes(phraseChars, /[^\w]/g)
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [dispatch, phraseChars])

  useDeepEqualEffect(() => {
    if (!isPuzzleSolved(phrase, usedChars) && isLastPuzzleVowelUsed(phraseChars, usedChars)) {
      dispatch(setCurrentSound(Sounds.NO_VOWELS_LEFT))
    }
  }, [dispatch, phrase, phraseChars, usedChars])

  const handleSolve = () => {
    dispatch(setCurrentSound(Sounds.PUZZLE_SOLVE))
    setPuzzleSolved()
  }

  const handleHighlightChars = (charStr: string) => {
    const chars: string[] = charStr.toUpperCase().split('')
    highlightChars(chars, dispatch)
  }

  const handlePuzzleChange = (direction: number) => {
    let roundIndex = currentRound.roundIndex + direction;

    if (roundIndex < 0) {
      roundIndex = 0
    }

    if (roundIndex > puzzlesCount) {
      roundIndex = puzzlesCount
    }

    history.push(`/play/${currentGame.id}/round/${roundIndex}`)
  }

  function handleEndGame() {
    dispatch(setGameStatus(GameStatus.Played))
    history.push('/')
  }

  const PopOutButton = (props: { children: React.ReactNode; onUnload: () => void; title: string; }) => (
    <OpenControlsButton onClick={() => setShouldPopOut(true)} title="Open Controls">
      <ControlsIcon width={25} style={{fill: 'white'}} />
    </OpenControlsButton>
  )

  const Controls = shouldPopOut
    ? NewWindow
    : PopOutButton

  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, phraseChars)

  return (
      <Controls onUnload={() => setShouldPopOut(false)} title="Controls">
        <ControlBoardWrapper>
          <ControlBoardHeader>
            <div>
              {currentGame.status === GameStatus.Active && (
                <Button onClick={() => dispatch(setGameStatus(GameStatus.Paused))}>
                  Pause game
                </Button>
              )}
              {currentGame.status === GameStatus.Paused && (
                <Button onClick={() => dispatch(setGameStatus(GameStatus.Active))}>
                  Resume game
                </Button>
              )}
              {currentGame.status !== GameStatus.Played && (
                <Button onClick={handleEndGame}>
                  End game
                </Button>
              )}
            </div>

            <div>
              <strong>Game {currentGame.id} - {currentRoundName}</strong>
              <br/>
              <span>Round {puzzleNumber} / {puzzlesCount}</span>
              {currentRound.bonus_round && (
                <strong> Bonus Round</strong>
              )}
            </div>

            <div>
              <Button
                disabled={!previousPuzzle}
                onClick={() => handlePuzzleChange(-1)}>
                {previousRoundName}
              </Button>
              <Button
                disabled={!nextPuzzle}
                onClick={() => handlePuzzleChange(1)}>
                {nextRoundName}
              </Button>
            </div>
          </ControlBoardHeader>

          <ControlBoardSection>
            <details>
              <FieldsetSummary>
                Spoiler
              </FieldsetSummary>
              <ControlBoardSpoiler>
                {phrase}
              </ControlBoardSpoiler>
              <Button onClick={handleSolve}>Solve Puzzle</Button>
            </details>
          </ControlBoardSection>

          <ControlBoardSection>
            <ControlBoardSectionTitle>
              Used Letter Board
            </ControlBoardSectionTitle>
            <UsedLetterBoard
              controlBoard={true}
            />

            <Button
              onClick={() => {
                const index = Math.floor((Math.random() * unrevealed.length))
                dispatch(setRevealedIndexes(unrevealed[index]))
              }}
              disabled={!unrevealed.length}>
              Reveal Highlighted{unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
            </Button>
          </ControlBoardSection>

          <ControlBoardSection>
            <ControlBoardSectionTitle>
              Sounds

              <div>
                {!isStopped(currentSound.status) && (
                  <span>{Sounds.getSoundName(currentSound.sound)}</span>
                )}

                {isPlaying(currentSound.status) && (
                  <Button
                    onClick={() => dispatch(setSoundStatus('PAUSED'))}
                    disabled={currentSound.status !== 'PLAYING'}>
                    Pause
                  </Button>
                )}
                {isPaused(currentSound.status) && (
                  <Button
                    onClick={() => dispatch(setSoundStatus('PLAYING'))}>
                    Play
                  </Button>
                )}
                <Button
                  onClick={() => dispatch(setSoundStatus('STOPPED'))}
                  disabled={isStopped(currentSound.status)}>
                  Stop
                </Button>

                <RangeInput
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={currentSound.volume}
                  onChange={(e) => dispatch(setSoundVolume(Number(e.target.value)))}
                />
              </div>
            </ControlBoardSectionTitle>

            <SoundboardWrapper>
              <StyledFieldset>
                <legend>Wheel</legend>
                {[Sounds.BANKRUPT, Sounds.BEN_WEDGE, Sounds.EXPRESS, Sounds.HALF_CARD, Sounds.MYSTERY, Sounds.WILD_CARD].map((sound, i) => (
                  <SoundboardButton key={i} onClick={() => dispatch(setCurrentSound(sound))}>
                    {Sounds.getSoundName(sound)}
                  </SoundboardButton>
                ))}
              </StyledFieldset>
              <StyledFieldset>
                <legend>Extra</legend>
                {[Sounds.THEME, Sounds.BONUS_ROUND_TIMER, Sounds.BONUS_ROUND_SOLVE, Sounds.TOSS_UP_THEME, Sounds.TOSS_UP_SOLVE].map((sound, i) => (
                  <SoundboardButton
                     key={i} onClick={() => dispatch(setCurrentSound(sound))}>
                    {Sounds.getSoundName(sound)}
                  </SoundboardButton>
                ))}
              </StyledFieldset>
            </SoundboardWrapper>
          </ControlBoardSection>

          <ControlBoardSection>
            <ControlBoardSectionTitle>
              Bonus Round
            </ControlBoardSectionTitle>
            <Button onClick={() => handleHighlightChars('RSTLNE')}>
              Highlight RSTLNE
            </Button>
            <br/>
            <Input
              type="text"
              value={attemptedLetters}
              placeholder="Enter attempted letters"
              onChange={(e) => dispatch(setAttemptedLetters(e.target.value))}
            />
            <Button onClick={() => handleHighlightChars(attemptedLetters)}>
              Highlight Letters
            </Button>
          </ControlBoardSection>
        </ControlBoardWrapper>
      </Controls>
  )
}

const ControlBoardWrapper = $.div`
  padding: 1rem;
  font-size: 1rem;
  user-select: text;
`

const ControlBoardSection = $.section`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`

const ControlBoardHeader = $(ControlBoardSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = $.button`
  font-size: 1rem;
  border: none;
  background: #3e51a9;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;

  &:hover {
    background: ${darken(0.1, '#3e51a9')};
  }

  &[disabled] {
    opacity: 0.4;

    &:hover {
      background: #3e51a9;
    }
  }
`

const ControlBoardSpoiler = $.p`
  font-size: 2rem;
`

const ControlBoardSectionTitle = $.h3`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SoundboardWrapper = $.div`
  display: flex;
`

const SoundboardButton = $(Button)`
  width: 100%;
`

const StyledFieldset = $.fieldset`
  flex: 1;
`

const FieldsetSummary = $.summary`
  cursor: pointer;
  outline: none;
  font-weight: bold;
`

const OpenControlsButton = $.button`
  border: none;
  background: none;
  position: absolute;
  top: 20px;
  left: 20px;
  outline: none;
  padding: 10px;
`

const Input = $.input`
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 0.3rem 0.8rem;
`

const RangeInput = $.input`
`

export default ControlBoard
