import React from 'react'
import $ from 'styled-components'
import { getFormattedCategory } from 'categories'

interface Props {
  category: string
}

export const Category: React.FC<Props> = ({ category }) => {
  if (!category) {
    return null
  }

  return (
    <CategoryWrapper>
      <CategoryBackground>
        {getFormattedCategory(category)}
      </CategoryBackground>
    </CategoryWrapper>
  )
}

const CategoryWrapper = $.div`
  margin-top: -1vw;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`

const CategoryBackground = $.div`
  background: #feb769;
  border: 0.3vw solid #333333;
  border-radius: 1.3vw;
  box-shadow: 0.3vw 0.3vw 0 0 #98754e inset;
  color: white;
  text-shadow: 0.2vw 0.2vw black;
  font-weight: 900;
  text-align: center;
  font-size: 2.2vw;
  padding: 0.8vw 2vw;
`

export default Category
