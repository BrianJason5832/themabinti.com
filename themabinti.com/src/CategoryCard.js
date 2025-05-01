import React from 'react'
import './CategoryCard.css'

const CategoryCard = ({ image, name, price, previousPrice, discountPercentage }) => {
  return (
    <div className='category-card'>
        <img src={image}/>
        <div className='category-name'><p>{name}</p></div>
    </div>
  )
}

export default CategoryCard
