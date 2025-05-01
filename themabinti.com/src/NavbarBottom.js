import React from 'react'
import './NavbarBottom.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';

function NavbarBottom() {
  // CHANGED: Replaced single activeDropdown with separate states
  const [isFindServicesOpen, setIsFindServicesOpen] = useState(false);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(null);

  // CHANGED: Updated toggle functions for two levels
  const toggleFindServices = () => {
    setIsFindServicesOpen(!isFindServicesOpen);
    if (!isFindServicesOpen) setActiveCategoryDropdown(null);
  };

  const toggleCategoryDropdown = (event, categoryId) => {
    event.stopPropagation(); 
    setActiveCategoryDropdown(activeCategoryDropdown === categoryId ? null : categoryId);
  };

  const closeDropdowns = () => {
    setIsFindServicesOpen(false);
    setActiveCategoryDropdown(null);
  };

  // NEW: Added navLinks array to structure categories and subcategories
  const navLinks = [
    {
      title: 'Find Services',
      id: 'findServices',
      subLinks: [
        {
          title: 'Beauty Services',
          id: 'beautyAndServices',
          links: [
            { title: 'Makeup', path: '/services/beauty/makeup' },
            { title: 'Nails', path: '/services/beauty/nails' },
            { title: 'Eyebrows & Lashes', path: '/services/beauty/eyebrows-lashes' },
            { title: 'Microblading', path: '/services/beauty/microblading' },
            { title: 'Tattoo & Piercings', path: '/services/beauty/tattoo-piercings' },
            { title: 'Waxing', path: '/services/beauty/waxing' },
            { title: 'ASMR & Massage', path: '/services/beauty/asmr-massage' },
            { title: 'Beauty hub', path: '/services/beauty/hub' },
          ],
        },
        {
          title: 'Hair Services',
          id: 'hairAndServices',
          links: [
            { title: 'Braiding', path: '/services/hair/braiding' },
            { title: 'Weaving', path: '/services/hair/weaving' },
            { title: 'Locs', path: '/services/hair/locs' },
            { title: 'Wig Makeovers', path: '/services/hair/wig-makeovers' },
            { title: 'Ladies Haircut', path: '/services/hair/ladies-haircut' },
            { title: 'Complete Hair Care', path: '/services/hair/complete-care' },
          ],
        },
        {
          title: 'Health',
          id: 'health',
          links: [
            { title: 'Skin Consultation', path: '/services/health/skin-consultation' },
            { title: 'Mental Health', path: '/services/health/mental-health' },
            { title: 'Maternal Care', path: '/services/health/maternal-care' },
            { title: 'Reproductive Care', path: '/services/health/reproductive-care' },
          ],
        },
        {
          title: 'Fitness',
          id: 'fitness',
          links: [
            { title: 'Gym', path: '/services/fitness/gym' },
            { title: 'Personal Trainers', path: '/services/fitness/personal-trainers' },
            { title: 'Nutritionist', path: '/services/fitness/nutritionist' },
          ],
        },
        {
          title: 'Fashion',
          id: 'fashion',
          links: [
            { title: 'African', path: '/services/fashion/african' },
            { title: 'Maasai Wear', path: '/services/fashion/maasai-wear' },
            { title: 'Crotchet', path: '/services/fashion/crotchet' },
            { title: 'Personal Stylist', path: '/services/fashion/personal-stylist' },
            // REMOVED: Duplicate 'Nutritionist' from original Fashion list
          ],
        },
        {
          title: 'Bridal',
          id: 'bridal',
          links: [
            { title: 'Bridal Makeup', path: '/services/bridal/makeup' },
            { title: 'Bridal Hair', path: '/services/bridal/hair' },
            { title: 'Maids for Hire', path: '/services/bridal/maids' },
            { title: 'Gowns for Hire', path: '/services/bridal/gowns' },
          ],
        },
        {
          title: 'Flowers & Gifts',
          id: 'flowersAndGifts',
          links: [
            { title: 'Personalized gifts', path: '/services/flowers-gifts/personalized' },
            { title: 'Customized Gifts', path: '/services/flowers-gifts/customized' },
          ],
        },
        {
          title: 'Home & Lifestyle',
          id: 'homeAndLifestyle',
          links: [
            { title: 'Cleaning Services', path: '/services/home-lifestyle/cleaning' },
            { title: 'Laundry Services', path: '/services/home-lifestyle/laundry' },
          ],
        },
        {
          title: 'Photography',
          id: 'photography',
          links: [
            { title: 'Event', path: '/services/photography/event' },
            { title: 'Lifestyle', path: '/services/photography/lifestyle' },
            { title: 'Portrait', path: '/services/photography/portrait' },
          ],
        },
      ],
    },
    { title: 'Blogs', path: '/blogs' },
    { title: 'About us', path: '/Aboutus' },
    { title: 'Contact & Support', path: '/contactus' },
  ];

  return (
    <div className='navbar-bottom'>
      <ul>
      {navLinks.map((link, index) => (
          <li key={index} className={link.subLinks ? 'find-services' : ''}>
            {link.subLinks ? (
              <>
                <span
                  onClick={toggleFindServices} // CHANGED: Used toggleFindServices
                  className="find-services-title"
                >
                  {link.title} <KeyboardArrowDownOutlinedIcon style={{ fontSize: '20px' }} />
                </span>
                {isFindServicesOpen && ( // CHANGED: Used isFindServicesOpen
                  <div className="find-services-inner">
                    <ul>
                      {link.subLinks.map((subLink, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={(e) => toggleCategoryDropdown(e, subLink.id)} // CHANGED: Added event and used toggleCategoryDropdown
                          className="category-item"
                        >
                          {subLink.title}
                          <div className="lower-line"></div>
                          {activeCategoryDropdown === subLink.id && (
                            <div className={`${subLink.id}-inner`}>
                              <ul>
                                {subLink.links.map((item, itemIndex) => (
                                  <React.Fragment key={itemIndex}>
                                    <li className="subcategory-item">
                                      <Link
                                        to={item.path}
                                        onClick={closeDropdowns}
                                        className="subcategory-link"
                                      >
                                        {item.title}
                                      </Link>
                                    </li>
                                    <div className="lower-line"></div>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to={link.path}
                style={{ textDecoration: 'none', color: 'var(--color-core-blue-160, #002d58)' }}
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavbarBottom
