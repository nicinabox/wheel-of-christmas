import React from 'react'
import cx from 'classnames'
// import * as API from 'types'

import './styles.css'

interface Props {
  char: string;
  isHighlighted: boolean;
  isRevealed: boolean;
  onReveal: () => void;
}

const Letter: React.FC<Props> = ({ char, isRevealed, isHighlighted, onReveal }) => {

  return (
      <div className="Letter">
        <button
          onClick={onReveal}
          disabled={!isHighlighted}
          className={cx('Letter-button', {
            'isHighlighted': isRevealed ? null : isHighlighted,
            'isRevealed': isRevealed,
          })}>
          {isRevealed && char}
        </button>
      </div>
  )
}

export default Letter
