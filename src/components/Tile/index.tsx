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
        {children}
      </div>
  )
}

export default Tile
