import React from 'react'
import './myaccountsidebar.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';

function Myaccountsidebar() {
  return (
    <div className='myaccount-sidebar'>
      <ul>
        <li><PersonOutlineIcon style={{marginRight:'15px'}}/> My Mabinti Account</li>
        <hr/>
        <li><AddBusinessOutlinedIcon style={{marginRight:'15px'}}/> Orders</li>
        <li><MailOutlinedIcon style={{marginRight:'15px'}}/> Inbox</li>
        <li><ChatOutlinedIcon style={{marginRight:'15px'}}/> Pending Reviews</li>
        <li><ContactMailOutlinedIcon style={{marginRight:'15px'}}/> Address Book</li>
        <li><PaymentOutlinedIcon style={{marginRight:'15px'}}/> Payment Settings</li>
        <li><NewspaperOutlinedIcon style={{marginRight:'15px'}}/> Newsletter Preferences</li>
      </ul>
    </div>
  )
}

export default Myaccountsidebar
