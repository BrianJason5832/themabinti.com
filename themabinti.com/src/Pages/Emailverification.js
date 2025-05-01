import React from 'react'
import './Emailverification.css'
import DeckIcon from '@mui/icons-material/Deck';
import { Link } from 'react-router-dom';

function Emailverification() {
  return (
    <div className='email-verification'>
      <DeckIcon style={{fontSize:'80px', color:'#f68b1e', marginLeft:'42%'}}/>
        <h2>Verify your email address</h2>
        <p>We have sent a verification code to </p>
        <div className='input-container'>
        <input className='first-number-input'></input>
        <input className='second-number-input'></input>
        <input className='third-number-input'></input>
        <input className='fourth-number-input'></input>
        </div>
        <Link to='/createaccount'>
        <button className='emailverification-submit-button'>Submit</button>
        </Link>
        <div className='request-new-code'>Request a new code</div>
        <div className='signup-support'>
        For further support, you may visit the Help Center or contact our customer service team.</div>
        <h3>MABINTI <DeckIcon style={{color:'#f68b1e'}}/></h3>
    </div>
  )
}

export default Emailverification
