import React from 'react'
import Navbar from '../Navbar'
import NavbarTop from '../NavbarTop'
import NavbarBottom from '../NavbarBottom'
import Footer from '../Footer'
import './aboutus.css'
function Aboutus() {
  return (
    <div className='about-us'>
        <NavbarTop/>
        <Navbar/>
        <NavbarBottom/>
        <div className='about-us-inner'>
            <h2>About Us</h2>
            <p>At themabinti.com, we specialize in providing personalized beauty, health, and wellness solutions tailored to the unique needs of women and families. Our mission is to bring convenience, time-saving solutions, and quality into your life with services designed to make every moment special.

            Founded with a passion for delivering high-quality, customized solutions, we focus on reliability, customer care, and attention to detail. Whether it’s offering expert health treatments, home maintenance services, or beauty treatments, we’re here to make your life easier and more beautiful.

            Our team of dedicated professionals is committed to ensuring your satisfaction through services that fit your lifestyle.</p>
        </div>
        <Footer/>
    </div>
  )
}

export default Aboutus
