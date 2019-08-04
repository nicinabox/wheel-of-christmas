import React from 'react'

import './styles.css'

interface Props {
  category: string;
}

export const Category: React.FC<Props> = ({ category }) => {
  return (
    <div className="Category">
      <div className="Category-background">
        {category.toUpperCase()}
      </div>
    </div>
  )
}

export default Category
