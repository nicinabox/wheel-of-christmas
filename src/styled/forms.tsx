import $ from 'styled-components'

export const InputGroup = $.div<{ horizontal?: boolean }>`
  margin-bottom: 20px;
  ${props => props.horizontal && `
    display: flex;
    flex-direction: row;
  `}
`

export const Label = $.label`
  font-size: 1rem;
`

export const LabelText = $.span`
  margin-right: 15px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-weight: 500;
  display: block;
`

export const RadioLabel = $.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
`

export const Input = $.input`
  height: 42px;
`

export const TextInput = $(Input)`
  font-size: 1.2rem;
  min-width: 300px;
  width: 100%;
  vertical-align: middle;
`

export const Select = $.select`
`

export const Actions = $.div`
  display: flex;
  justify-content: space-between;
`
