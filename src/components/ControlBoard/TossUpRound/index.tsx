import React from 'react'
import { ControlBoardSection, Summary } from '../styled'

interface TossUpRoundProps {}

export const TossUpRound: React.FC<TossUpRoundProps> = ({  }) => {
  return (
    <ControlBoardSection>
      <details>
        <Summary>
          Toss Up Round
        </Summary>
      </details>
    </ControlBoardSection>
  )
}

export default TossUpRound
