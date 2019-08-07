import React from 'react'
import { range, random } from 'lodash'
import './styles.css'

interface Props {}

const generateStyle = (n: number, total: number) => {
  return ({
    animationDuration: `${random(8, 30)}s`,
    animationDelay: `${random(1, 8)}s`,
    left: `${n * (100 / total)}%`,
  })
}

export const Snow: React.FC<Props> = () => {
  const totalFlakes = random(30, 60)

  return (
    <div className="Snow">
      {range(1, totalFlakes + 1).map((n) => (
        <div
          className="Snowflake"
          style={generateStyle(n, totalFlakes)}
        />
      ))}
  </div>
  )
}

export default Snow
