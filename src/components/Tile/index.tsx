import React from 'react'
import cx from 'classnames'

import './styles.css'

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Tile: React.FC<Props> = ({ className, children }) => {

  return (
      <div className={cx('Tile', className)}>
        <div className="Tile-inner">
          {children}
        </div>
      </div>
  )
}

export default Tile
