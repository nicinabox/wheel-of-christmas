import React from 'react'
import { range, random } from 'lodash'
import './styles.css'

interface Props {
  totalFlakes?: number;
}

const generateStyle = (n: number, total: number) => {
  const size = random(0.1, 0.5)
  const opacity = random(0.3, 0.9)
  const animationDuration = random(8, 40)
  const animationDelay = random(1, 15)

  return ({
    opacity,
    width: `${size}vw`,
    height: `${size}vw`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`,
  })
}

export const Snow: React.FC<Props> = ({ totalFlakes = 100 }) => {
  return (
    <div className="Snow">
      {range(1, totalFlakes + 1).map((n, i) => (
        <i
          className="Snowflake"
          style={generateStyle(i, totalFlakes)}
        />
      ))}
  </div>
  )
}

export default Snow
