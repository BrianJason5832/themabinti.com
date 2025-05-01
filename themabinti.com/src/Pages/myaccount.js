import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Myaccountsidebar from '../myaccountsidebar'
import './myaccount.css'
import RightTab from '../RightTab'

function Myaccount() {
  return (
    <div className='myaccount-container'>
      <Navbar/>
      <div className='myaccount-upper-component'>
      <Myaccountsidebar/>
      <RightTab/>
      </div>
      <div className='myaccount-lower-component'>
        
      </div>
      <Footer/>
    </div>
  )
}

export default Myaccount
