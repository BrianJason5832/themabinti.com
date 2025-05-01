import React from 'react'
import './RightTab.css'

function RightTab() {
  return (
    <div className='right-tab'>
      <div className='right-tab-title'>
        <h2>Orders</h2>
      </div>
      <div className='right-tab-title-options'>
        <p>ONGOING/DELIVERED (0)</p>
      </div>
      <div className='right-tab-title-description'>
        <img src={require('./cart.svg').default}/>
        <h3>You have placed no orders yet!</h3>
        <p>All your orders will be saved here for you to access their state anytime.</p>
        <button>Continue shopping</button>
      </div>
    </div>
  )
}

export default RightTab
