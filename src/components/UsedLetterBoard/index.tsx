import React from 'react'
import $, { ThemeProvider } from 'styled-components'
import * as API from 'types'
import { VOWELS } from 'utils'

interface Props {
  usedChars: API.Char[];
  onLetterClick: (char: string) => void;
  controlBoard?: boolean;
}

interface StyleProps {
  controlBoard: boolean;
}

const generateAlphas = () => {
  const start = 'A'.charCodeAt(0)
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(start + i))
}

const UsedLetterBoard: React.FC<Props> = ({ onLetterClick, usedChars, controlBoard = false }) => {
  const chars = generateAlphas()

  return (
    <Root controlBoard={controlBoard}>
      <Background controlBoard={controlBoard}>
        {chars.map((char) => (
          <Button
            key={char}
            disabled={usedChars.includes(char)}
            isVowel={VOWELS.includes(char)}
            onClick={() => onLetterClick(char)}>
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
