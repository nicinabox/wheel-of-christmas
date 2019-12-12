import CATEGORIES, { getFormattedCategory } from 'categories'
import React from 'react'
import $ from 'styled-components'
import { InputGroup, Label, LabelText, Input, Select, Actions, RadioLabel, TextInput } from 'styled/forms'
import { Button, DestructiveButton } from 'styled/buttons'
import API from 'interfaces/api'
import TossUpRevealOrder from './TossUpRevealOrder'

export interface FormValues {
  name: string
  phrase: string
  category: string
  round_type: API.RoundType | undefined
  toss_up_reveal_order: number[]
}

interface FormFieldsProps {
  values: FormValues,
  onChange: (name: string, value: any) => void
  onSubmit: () => void
  onDelete?: () => void
}

export const FormFields: React.FC<FormFieldsProps> = ({ values, onChange, onSubmit, onDelete }) => {
  function handleChange({ target }) {
    const { name, value, type, checked } = target
    let nextValue = value

    if (type === 'checkbox') {
      nextValue = checked
    }

    if (name === 'phrase') {
      nextValue = value.toUpperCase()
    }

    onChange(name, nextValue)
  }

  return (
    <Form>
      <InputGroup>
        <Label>
          <LabelText>
            Round Name
          </LabelText>
          <TextInput type="text" name="name" value={values.name || ''} onChange={handleChange}
            placeholder="Optional"
          />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          <LabelText>
            Phrase
          </LabelText>
          <TextInput required type="text" name="phrase" value={values.phrase || ''} onChange={handleChange} />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          <LabelText>
            Category
          </LabelText>
          <Select required name="category" value={values.category} onChange={handleChange}>
            <option value="">Select category...</option>

            {CATEGORIES.map((text: string) => (
              <option key={text} value={text}>{getFormattedCategory(text)}</option>
            ))}
          </Select>
        </Label>
      </InputGroup>

      <div>
        <LabelText>Round Type</LabelText>

        <InputGroup horizontal>
          <RadioLabel>
            <Input type="radio" name="round_type" value="" checked={!values.round_type} onChange={handleChange} />
            Standard
          </RadioLabel>

          <RadioLabel>
            <Input type="radio" name="round_type" value="toss_up" checked={values.round_type === 'toss_up'} onChange={handleChange} />
            Toss-up
          </RadioLabel>

          <RadioLabel>
            <Input type="radio" name="round_type" value="bonus" checked={values.round_type === 'bonus'} onChange={handleChange} />
            Bonus
          </RadioLabel>
        </InputGroup>
      </div>

      {values.round_type === 'toss_up' && (
        <InputGroup>
          <Label>
            <LabelText>Select Reveal Order</LabelText>
            <TossUpRevealOrder
              phrase={values.phrase}
              value={values.toss_up_reveal_order}
              onChange={(nextValue) => onChange('toss_up_reveal_order', nextValue)}
            />

            <TextInput
              name="toss_up_reveal_order"
              value={JSON.stringify(values.toss_up_reveal_order)}
              readOnly
            />
          </Label>
        </InputGroup>
      )}

      <Actions>
        <Button type="submit" onClick={onSubmit}>
          Save
        </Button>

        {onDelete ? (
          <DestructiveButton type="submit" onClick={onDelete}>
            Delete
          </DestructiveButton>
        ) : null}
      </Actions>
    </Form>
  )
}

const Form = $.div`
  width: 800px;
  margin: 0 auto;
`

export default FormFields
