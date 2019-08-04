import React from 'react'
import cx from 'classnames'
// import * as API from '../../interfaces/api'

import './styles.css'

interface Props {
  char: string;
  isSolved: boolean;
  isRevealed: boolean;
  onReveal: () => void;
}

const Letter: React.FC<Props> = ({ char, isRevealed, isSolved, onReveal }) => {

  return (
      <div className="Letter">
        <button
          onClick={onReveal}
          disabled={!isSolved}
          className={cx('Letter-button', {
            'isSolved': isRevealed ? null : isSolved,
            'isRevealed': isRevealed,
          })}>
          {isRevealed && char}
        </button>
      </div>
  )
}

export default Letter
