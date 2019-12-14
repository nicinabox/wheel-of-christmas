import $ from 'styled-components'
import { lighten } from 'polished'

const defaultColor = '#1a4048'

interface ButtonProps {
  background?: string
  color?: string
}

export const Button = $.button<ButtonProps>`
  font-size: 1rem;
  border: none;
  background: ${p => p.background || defaultColor};
  color: ${p => p.color || 'white'};
  padding: 0.4rem 0.8rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;
  text-decoration: none;

  &:hover {
    background: ${p => lighten(0.1, p.background || defaultColor)};
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`

export const SecondaryButton = $(Button)`
  background: none;
  color: ${defaultColor};

  &:hover {
    background: #efefef;
    color: ${lighten(0.2, defaultColor)};
  }
`

export const DestructiveButton = $(Button)`
  border: none;
  background: none;
  color: black;

  &:hover {
    background: #a42d2d;
    color: white;
  }
`
