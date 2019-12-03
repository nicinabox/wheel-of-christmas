import React from 'react'
import $ from 'styled-components'
import * as API from 'interfaces/types'
import * as Sounds from 'sounds'
import { isVowel } from 'utils'
import { setUsedChars, setHighlightedChars } from 'store/actions/roundActions'
import { generateAlphas } from 'utils'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { setCurrentSound } from 'store/actions/soundsActions';

interface Props {
  controlBoard?: boolean;
}

interface StyleProps {
  controlBoard: boolean;
}

const ALPHAS = generateAlphas()

const UsedLetterBoard: React.FC<Props> = ({ controlBoard = false }) => {
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.currentRound)
  const { usedChars, phraseChars } = state

  const handleLetterAttempt = (char: API.Char) => {
    if (phraseChars.includes(char)) {
      dispatch(setCurrentSound(Sounds.DING))
    } else {
      dispatch(setCurrentSound(Sounds.BUZZER))
    }

    dispatch(setUsedChars(char))
    dispatch(setHighlightedChars(char))
  }

  return (
    <Root controlBoard={controlBoard}>
      <Background controlBoard={controlBoard}>
        {ALPHAS.map((char) => (
          <Button
            key={char}
            disabled={usedChars.includes(char)}
            isVowel={isVowel(char)}
            onClick={() => handleLetterAttempt(char)}>
            {char}
          </Button>
        ))}
      </Background>
    </Root>
  )
}

const Root = $.div<StyleProps>`
  margin-top: ${p => p.controlBoard ? 0 : '3vh'};
  flex: 1;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  user-select: none;
  position: relative;
  z-index: 1;
`

const Background = $.div<StyleProps>`
  background: #8c959d;
  border: 0.3vw solid white;
  box-shadow: 0.3vw 0.3vw 0 0 #5f6468 inset;
  border-radius: 1.3vw;
  padding: 0 1rem;
  display: flex;
  flex: ${p => p.controlBoard ? 1 : 0};
`

const Button = $.button<{ isVowel: boolean; }>`
  background: none;
  border: none;
  font-weight: 900;
  font-size: 2vw;
  color: white;
  padding: 0.8vw 0.8vw;
  outline: none;
  flex: 1;

  &[disabled] {
    opacity: 0;
  }
`

export default UsedLetterBoard
