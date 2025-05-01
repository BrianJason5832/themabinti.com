import React from 'react'
import './NavbarTop.css'
import DeckIcon from '@mui/icons-material/Deck';

function NavbarTop() {
  return (
    <div className='navbar-top'>
      <div className='catchPhrase'> <DeckIcon style={{ color: '#002d58', marginRight:'10px'}}/><p>Sell on Mabinti</p></div>
      <div className= 'contact'><p>Contact us: 0712161506</p></div>
    </div>
  )
}

export default NavbarTop
