import $ from 'styled-components'
import { Button } from 'styled/buttons'
import { lighten } from 'polished'

export const Section = $.section`
  border-bottom: 1px solid #eee;
`

export const Summary = $.summary`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: default;
  outline: none;
  font-weight: bold;
`

export const SummaryActions = $.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`

export const Details = $.details<{ open?: boolean }>`
  $[open] ${Summary} {
    margin-bottom: 1rem;
  }
`

export const DetailsSection = $.section`
  padding: 0 1.5rem 1rem;
`

export const SolvePuzzleButton = $(Button)`
  background: #f17444;

  &:hover {
    background: ${lighten(0.1, '#f17444')};
  }
`
