import React from 'react'
import $ from 'styled-components'
import CATEGORIES, { getFormattedCategory } from 'categories'

export interface FormValues {
  id?: number
  name: string
  phrase: string
  category: string
  bonus_round: boolean
}

interface FormFieldsProps {
  values: FormValues,
  onChange: (name: string, value: any) => void
  onSubmit: () => void
}

export const FormFields: React.FC<FormFieldsProps> = ({ values, onChange, onSubmit }) => {

  function handleChange({ target }) {
    const { name, value, type, checked } = target

    if (type === 'checkbox') {
      return onChange(name, checked)
    }

    if (name === 'phrase') {
      return onChange(name, value.toUpperCase())
    }

    onChange(name, value)
  }

  return (
    <Form>
      <InputGroup>
        <Label>
          <LabelText>
            Round Name
          </LabelText>
          <Input type="text" name="name" value={values.name} onChange={handleChange}
            placeholder="Optional"
          />
        </Label>
      </InputGroup>

      <InputGroup>
        <Label>
          <LabelText>
            Phrase
          </LabelText>
          <Input required type="text" name="phrase" value={values.phrase} onChange={handleChange} />
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

      <Button type="submit" onClick={onSubmit}>
        Save
      </Button>
    </Form>
  )
}

const Form = $.div`
  width: 800px;
  margin: 0 auto;
`

const InputGroup = $.div`
  margin-bottom: 20px;
`

const Label = $.label`
  font-size: 1rem;
`

const LabelText = $.span`
  margin-right: 15px;
  margin-bottom: 4px;
  font-weight: 500;
  display: block;
`

const Input = $.input`
  padding: 5px;
  font-size: 1.2rem;
  width: 100%;
`

const Select = $.select`
`

const Button = $.button`
  color: #fff;
  font-weight: bold;
  border: none;
  background: #445abb;
  padding: 10px;
`

export default FormFields
