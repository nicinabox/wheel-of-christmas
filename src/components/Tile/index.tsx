import React from 'react'
import $ from 'styled-components'
import grid from 'grid'

import { ReactComponent as Logo } from 'images/logo.svg';

interface Props {
  tileId: number;
  children: React.ReactNode;
}

const Tile: React.FC<Props> = ({ tileId, children }) => {

  return (
      <Root tileId={tileId}>
        <Background>
          {children || (
            <TileLogo width="100%" height="100%" />
          )}
        </Background>
      </Root>
  )
}

const Root = $.div<Props>`
  display: flex;
  background: #222;
  border: 0.3vw solid #222;
  grid-area: ${({ tileId }) => grid[tileId]}
`

const Background = $.div`
  background: linear-gradient(#34AD78, #2C9467);
  border-radius: 0.4vw;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const TileLogo = $(Logo)`
  padding: 12%;
`

export default Tile
