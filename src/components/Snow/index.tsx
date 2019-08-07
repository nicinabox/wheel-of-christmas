import React from 'react'
import { range, random } from 'lodash'
import './styles.css'

interface Props {}

const generateStyle = (n: number, total: number) => {
  const size = random(0.1, 0.5);
  const opacity = random(0.3, 0.9);
  return ({
    opacity,
    width: `${size}vw`,
    height: `${size}vw`,
    animationDuration: `${random(8, 40)}s`,
    animationDelay: `${random(1, 15)}s`,
    left: `${n * (100 / total)}%`,
  })
}

export const Snow: React.FC<Props> = () => {
  const totalFlakes = 100 // random(30, 60)

  return (
    <div className="Snow">
      {range(1, totalFlakes + 1).map((n, i) => (
        <div
          className="Snowflake"
          style={generateStyle(i, totalFlakes)}
        />
      ))}
  </div>
  )
}

export default Snow
