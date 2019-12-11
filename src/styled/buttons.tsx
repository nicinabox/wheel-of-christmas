import $ from 'styled-components'
import { darken } from 'polished'

export const Button = $.button`
  font-size: 1rem;
  border: none;
  background: #3e51a9;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;

  &:hover {
    background: ${darken(0.1, '#3e51a9')};
  }

  &[disabled] {
    opacity: 0.4;

    &:hover {
      background: #3e51a9;
    }
  }
`

export const DestructiveButton = $(Button)`
  border: none;
  background: transparent;
  color: black;

  &:hover {
    background: red;
    color: white;
  }
`
