import React from 'react'
import './Categories.css'
import CategoryCard from './CategoryCard'

function Categories() {
  return (
    <div className='categories'>
      <div className='category-title'><h2>Categories</h2></div>
      <div className='category-options'>
      <CategoryCard
        image={require('./Nails4.jpeg')}
        name="Beauty Services"
      />
      <CategoryCard
        image={require('./Nails3.jpg')}
        name="Hair Services"
      />
      <CategoryCard
        image={require('./HeroImage5.jpg')}
        name="Fashion/Culture"
      />
      <CategoryCard
        image={require('./Nails6.jpg')}
        name="Bridal Services"
      />
      <CategoryCard
        image={require('./Health1.jpg')}
        name="Photography"
      />
      </div>
    </div>
  )
}

export default Categories
