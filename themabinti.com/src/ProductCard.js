import React from 'react'
import './ProductCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const ProductCard = ({ image, name, price, location, phoneNumber }) => {
  return (
    <div className='product-card'>
      <div className='like-button'><FavoriteBorderIcon/></div>
      <div className='product-card-image'>
        <img src={image}/>
        <div className='product-name'><p>{name}</p></div>
        <div className='product-price'><p>{price}</p></div>
        <div className='location'><p>{location}</p></div>
        <div className='book-button'><button>Book</button></div>
      </div>
    </div>
  )
}

export default ProductCard
