import CATEGORIES, { getFormattedCategory } from 'categories'
import React from 'react'
import $ from 'styled-components'
import { InputGroup, Label, LabelText, Input, Select, Actions, RadioLabel, TextInput } from 'styled/forms'
import { Button, DestructiveButton } from 'styled/buttons'

export interface FormValues {
  id?: number
  name: string
  phrase: string
  category: string
  position: number
  bonus_round: boolean
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

      <InputGroup>
        <Label>
          <LabelText>
            Bonus round
          </LabelText>
          <Input type="checkbox" name="bonus_round" checked={values.bonus_round} onChange={handleChange} />
        </Label>
      </InputGroup>

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
