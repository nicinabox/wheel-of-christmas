import React from 'react'
import cx from 'classnames'
// import * as API from '../../interfaces/api'

import './styles.css'

interface Props {
  letter: string;
  isActive: boolean;
  isSolved: boolean;
  onClick: () => void;
}

const Letter: React.FC<Props> = ({ letter, isActive, isSolved, onClick }) => {

  function handlePress(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    onClick()
  }

  return (
      <button
        onClick={handlePress}
        className={cx('Letter', {
          'isActive': isActive,
          'isSolved': isSolved,
          'isSpace': /[\s]/.test(letter),
        })}
        disabled={!isActive}>
        {isSolved ? (
          <span className="Letter-reveled">{letter}</span>
        ) : (
          <span className="Letter-hidden" />
        )}
      </button>
  )
}

export default Letter
