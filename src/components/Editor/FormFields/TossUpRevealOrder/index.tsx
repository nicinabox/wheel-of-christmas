import React from 'react'
import $ from 'styled-components'
import { Button } from 'styled/buttons'

interface TossUpRevealOrderProps {
  phrase: string
  value: number[]
  onChange: (nextValue: number[]) => void
}

export const TossUpRevealOrder: React.FC<TossUpRevealOrderProps> = ({ phrase, value, onChange }) => {
  const phraseChars = phrase.split('').filter(c => /\w/.test(c))

  function handleSelect(charIndex: number) {
    const selectedCharIndex = value.indexOf(charIndex)

    let nextValue: number[] = []

    if (selectedCharIndex > -1) {
      nextValue = value.filter((_, i: number) => i !== selectedCharIndex)
    } else {
      nextValue = value.concat(charIndex)
    }

    onChange(nextValue)
  }

  return (
    <Container>
      {phraseChars.map((char, i) => {
        const isSelected = value.indexOf(i) > -1
        return (
          <Char key={`${char}.${i}`}>
            <Button onClick={() => handleSelect(i)}>
              {char}
            </Button>
            {isSelected && (
              <Hint>
                {value.indexOf(i) + 1}
              </Hint>
            )}
          </Char>
        )
      })}
    </Container>
  )
}

const Container = $.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const Char = $.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Hint = $.span`
  color: white;
  background: black;
  display: inline-block;
  padding: 4px;
  font-size: 12px;
`

export default TossUpRevealOrder
