import $ from 'styled-components'

export const ControlBoardSection = $.section`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`

export const ControlBoardHeader = $(ControlBoardSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ControlBoardSectionTitle = $.h3`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
