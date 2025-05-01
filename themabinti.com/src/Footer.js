import React from 'react'
import DeckIcon from '@mui/icons-material/Deck';
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-upper'>
        <div className='footer-inner-part'>
          <h1>MABINTI <DeckIcon style={{ color: '#f68b1e'}}/></h1>
        </div>
        <div className='footer-inner-part'>
          <h2>New to MABINTI?</h2>
          <p>Subscribe to our newsletter</p>
          <input type="email" class="email-input" placeholder="Enter E-mail Address"/>
        <p>I agree to Mabinti's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.</p>
        <div class="checkbox-container">
            <input type="checkbox" id="subscribe"/>
            <label for="subscribe">Subscribe</label>
        </div>
        
        <button class="subscribe-btn">SUBSCRIBE</button>

        </div>
        <div className='footer-inner-part'>
          <h2>DOWNLOAD MABINTI FREE APP</h2>
          <p>Get access to exclusive offers!</p>
        </div>
      </div>
      <div className='footer-lower'>
        <p>@ Copyright 2025</p>
      </div>
    </div>
  )
}

export default Footer
