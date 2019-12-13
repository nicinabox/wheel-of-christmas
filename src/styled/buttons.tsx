import $ from 'styled-components'
import { lighten } from 'polished'

export const Button = $.button`
  font-size: 1rem;
  border: none;
  background: #1a4048;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;

  &:hover {
    background: ${lighten(0.1, '#1a4048')};
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`

export const DestructiveButton = $(Button)`
  border: none;
  background: transparent;
  color: black;

  &:hover {
    background: #a42d2d;
    color: white;
  }
`
