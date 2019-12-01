import React from 'react'
import { range, random } from 'lodash'
import $, { keyframes } from 'styled-components'

interface Props {
  totalFlakes?: number;
}

const generateStyle = () => {
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

export const Snow: React.FC<Props> = React.memo(({ totalFlakes = 100 }) => {
  return (
    <Root>
      {range(1, totalFlakes + 1).map((n, i) => (
        <Flake key={n} style={generateStyle()} />
      ))}
    </Root>
  )
})

const snowing = keyframes`
100% {
  transform: translateY(40vw);
  opacity: 0;
}
`

const Root = $.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: -2%;
  display: flex;
  justify-content: space-around;
`

const Flake = $.i`
background: white;
box-shadow: 0 0 0.2vw 0.1vw white;
width: 0.4vw;
height: 0.4vw;
border-radius: 50%;
animation-name: ${snowing};
animation-iteration-count: infinite;
`

export default Snow
