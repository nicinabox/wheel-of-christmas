import React from 'react'
import $ from 'styled-components'
import * as API from 'interfaces/types'

interface Props {
  char: API.Char;
  isHighlighted: boolean;
  isRevealed: boolean;
  onReveal: () => void;
}

type StyleProps = Partial<Props>

const Letter: React.FC<Props> = ({ char, isRevealed, isHighlighted, onReveal }) => {

  return (
      <LetterWrapper>
        <LetterButton
          onClick={onReveal}
          disabled={isRevealed ? true : !isHighlighted}
          isRevealed={isRevealed}
          isHighlighted={isHighlighted}>
          {isRevealed && char}
        </LetterButton>
      </LetterWrapper>
  )
}

const LetterWrapper = $.div`
  width: 100%;
  height: 100%;
`

const LetterButton = $.button<StyleProps>`
  font-family: "Avenir Next Condensed";
  font-size: 6.5vw;
  line-height: 1;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 900;
  color: #222;
  width: 100%;
  height: 100%;
  background: ${({ isHighlighted, isRevealed }) => {
    if (isHighlighted && !isRevealed) return '#5c79fe'
    return 'white'
  }};

  &[disabled] {
    pointer: inherit;
    user-select: none;
  }
`

export default Letter
