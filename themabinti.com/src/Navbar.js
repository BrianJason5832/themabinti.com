import React from 'react';
import './Navbar.css';
import DeckIcon from '@mui/icons-material/Deck';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Input, InputAdornment } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import logo from './themabinti.png'
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from './store/auth-slice';
import { useNavigate } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Navbar = () => {
  // Existing navbar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Account dropdown state
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownRef = useRef(null);

  const [isPopUpFormOpen, setIsPopUpFormOpen] = useState(false);

  // Mobile dropdown state for nested menus
  const [activeDropdowns, setActiveDropdowns] = useState([]);

  const [desktopDropdown, setDesktopDropdown] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.user?.userName);
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const [searchQuery, setSearchQuery] = useState('');

  const [activeTab, setActiveTab] = useState('appointment'); 

  const [selectedTime, setSelectedTime] = useState(null); 

  const [enquiryForm, setEnquiryForm] = useState({ 
    name: '',
    email: '',
    message: '',
  });


  const [currentDate, setCurrentDate] = useState(new Date('2025-04-06'));

  // Function to format date as "Sunday, April 6th 2025"
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Add useState for location
  const [selectedLocation, setSelectedLocation] = useState('');

  const hardcodedLocations = [
    'Nairobi',
    'Nakuru',
    'Kiambu',
    'Kisumu',
    'Thika',
  ];

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    if (location) {
      navigate(`/services/location/${location.toLowerCase()}`);
    }
  };

  const handleDesktopDropdown = (dropdownId) => {
    setDesktopDropdown(dropdownId === desktopDropdown ? null : dropdownId);
  };

  // Function to handle date change
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Handle sign out
  const handleSignOut = () => {
    dispatch(clearUser());
    setIsAccountDropdownOpen(false);
    navigate('/login');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) setActiveDropdowns([]); // Reset sub-menus when closing
  };

  // Handle time slot selection and switch to Enquiry tab
  const handleTimeSelect = (time) => { // CHANGE 5
    setSelectedTime(time);
    setActiveTab('enquiry');
  };

  // Handle enquiry form input changes
  const handleFormChange = (e) => { 
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle enquiry form submission
  const handleFormSubmit = (e) => { 
    e.preventDefault();
    console.log('Booking Appointment:', {
      date: formatDate(currentDate),
      time: selectedTime,
      ...enquiryForm,
    });
    // TODO: Add API call to submit the booking
    setIsPopUpFormOpen(false);
    setActiveTab('appointment'); // Reset to Appointment tab
    setSelectedTime(null); // Clear selected time
    setEnquiryForm({ name: '', email: '', message: '' }); // Reset form
  };

  // NavbarBottom links structure
  const navLinks = [
    {
      title: 'Find Services',
      id: 'findServices', // *** CHANGE 3: Added id for top-level menu ***
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
            { title: 'Beauty hub', path: '/services/beauty/hub' }
          ]
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
            { title: 'Complete Hair Care', path: '/services/hair/complete-care' }
          ]
        },
        {
          title: 'Health',
          id: 'health',
          links: [
            { title: 'Skin Consultation', path: '/services/health/skin-consultation' },
            { title: 'Mental Health', path: '/services/health/mental-health' },
            { title: 'Maternal Care', path: '/services/health/maternal-care' },
            { title: 'Reproductive Care', path: '/services/health/reproductive-care' }
          ]
        },
        {
          title: 'Fitness',
          id: 'fitness',
          links: [
            { title: 'Gym', path: '/services/fitness/gym' },
            { title: 'Personal Trainers', path: '/services/fitness/personal-trainers' },
            { title: 'Nutritionist', path: '/services/fitness/nutritionist' }
          ]
        },
        {
          title: 'Fashion',
          id: 'fashion',
          links: [
            { title: 'African', path: '/services/fashion/african' },
            { title: 'Maasai Wear', path: '/services/fashion/maasai-wear' },
            { title: 'Crotchet', path: '/services/fashion/crotchet' },
            { title: 'Personal Stylist', path: '/services/fashion/personal-stylist' }
          ]
        },
        {
          title: 'Bridal',
          id: 'bridal',
          links: [
            { title: 'Bridal Makeup', path: '/services/bridal/makeup' },
            { title: 'Bridal Hair', path: '/services/bridal/hair' },
            { title: 'Maids for Hire', path: '/services/bridal/maids' },
            { title: 'Gowns for Hire', path: '/services/bridal/gowns' }
          ]
        },
        {
          title: 'Flowers & Gifts',
          id: 'flowersAndGifts',
          links: [
            { title: 'Personalized gifts', path: '/services/flowers-gifts/personalized' },
            { title: 'Customized Gifts', path: '/services/flowers-gifts/customized' }
          ]
        },
        {
          title: 'Home & Lifestyle',
          id: 'homeAndLifestyle',
          links: [
            { title: 'Cleaning Services', path: '/services/home-lifestyle/cleaning' },
            { title: 'Laundry Services', path: '/services/home-lifestyle/laundry' }
          ]
        },
        {
          title: 'Photography',
          id: 'photography',
          links: [
            { title: 'Event', path: '/services/flowers-gifts/event' },
            { title: 'Lifestyle', path: '/services/flowers-gifts/customized' },
            { title: 'Portrait', path: '/services/flowers-gifts/customized' }
          ]
        }
      ]
    },
    { title: 'Blogs', path: '/blogs' },
    { title: 'About us', path: '/Aboutus' },
    { title: 'Contact & Support', path: '/contactus' }
  ];

  // *** CHANGE 2: Updated toggleDropdown to handle multiple dropdowns ***
  const toggleDropdown = (dropdownName) => {
    setActiveDropdowns((prev) => {
      if (prev.includes(dropdownName)) {
        return prev.filter((name) => name !== dropdownName); // Close the dropdown
      } else {
        return [...prev, dropdownName]; // Open the dropdown
      }
    });
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page with query as URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Clear input after search
    }
  };

  return (
      <div className='navbar'>
        <div className='hambuger-menu' onClick={toggleMobileMenu}>{mobileMenuOpen ? <CloseIcon style={{ fontSize: '30px' }} /> : <MenuOutlinedIcon style={{ fontSize: '30px' }} />}</div>
        <div className='logo'><img src={logo}/></div>
        <div className='person-icon'><PersonOutlineOutlinedIcon style={{fontSize:'30px'}}/></div>        
        <div className='select-location'>
        <select id="locations" name="locations" value={selectedLocation} onChange={handleLocationChange}>
          <option value="" disabled>
            Select a location
          </option>
          {hardcodedLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        </div>
        <form onSubmit={handleSearch} className="search-container">
          <div className='search-part'>
          <SearchOutlinedIcon style={{ color: 'grey', paddingLeft:'10px' }}/>
          <input type="text" placeholder="Find Services"
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value);e.target.style.fontSize = '14px';
              e.target.style.color = '#313133'}}/>
          </div>
          <button type="submit">Search</button>
        </form>
        <div className='account-container'>
          <div className='account' onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}><PersonOutlineOutlinedIcon style={{ paddingRight: '5px' }}/> {userName || 'Account'} <KeyboardArrowDownOutlinedIcon/></div>
          {isAccountDropdownOpen && (
          <div class="account-dropdown-content">
            {!isLoggedIn ? (
                <Link to="/login" className="signin-button">
                  <button onClick={() => setIsAccountDropdownOpen(false)}>Sign In</button>
                </Link>
              ) : (
                <button onClick={handleSignOut} className="signout-button" style={{marginLeft:'45px',marginTop:'10px', fontSize:'12px'}}>
                  Sign Out
                </button>
              )}
              {isLoggedIn && (
                      <>
                        <Link to="/PostService" className="post-service-button">
                          <button onClick={() => setIsAccountDropdownOpen(false)} style={{marginLeft:'32px',marginTop:'10px', fontSize:'12px'}}>Post a Service</button>
                        </Link>
                        <div className="my-account-option">
                          <p>
                            <PersonOutlineOutlinedIcon style={{ marginRight: '15px' }} /> My Account
                          </p>
                        </div>
                        <div className="orders-option">
                          <p>
                            <AddShoppingCartOutlinedIcon style={{ marginRight: '15px' }} /> Orders
                          </p>
                        </div>
                      </>
                    )}
          </div>
          )}
        </div>
        <div className='book-appointment-button'>
        <button onClick={() => {setIsPopUpFormOpen (!isPopUpFormOpen);
          setActiveTab('appointment')}
        }>Book Appointment</button>
        {isPopUpFormOpen && (
          <div class="popup-form">
            <div className='close-icon' onClick={() => {setIsPopUpFormOpen (!isPopUpFormOpen);
              setActiveTab('appointment'); // Reset to Appointment tab when closing
              setSelectedTime(null); // Clear selected time
              setEnquiryForm({ name: '', email: '', message: '' }); // Reset form
            }}><CloseIcon style={{color:'white'}}/></div>
            <div className='pop-up-form-inner'>
              <div className='selection-tabs'>
              <div className={`appointment ${activeTab === 'appointment' ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab('appointment')}>
              <h1>Appointment</h1>
              </div>
              <div className={`enquiry ${activeTab === 'enquiry' ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab('enquiry')}>
              <h1>Enquiry</h1>
              </div>
              <div className='selection-tabs-third-part'></div>
              </div>
              {activeTab === 'appointment' ? (
                <>
              <h2>Select a date and time slot to book an Appointment</h2>
              
              <p>Date Of Appointment</p> 
              <div className='date'> <KeyboardArrowLeftIcon style={{color:'white', backgroundColor:'#a25aff',cursor:'pointer',fontSize:'30px'}} onClick={() => changeDate(-1)}/>
              <h4>{formatDate(currentDate)}</h4>
              <KeyboardArrowRightIcon style={{color:'white', backgroundColor:'#a25aff',cursor:'pointer',fontSize:'30px'}} onClick={() => changeDate(1)}/>
              </div>
              <div className='pop-up-form-inner-morning'>
                <h3><Brightness7Icon style={{fontSize:'20px', marginLeft:'10px',marginRight:'5px'}}/>Morning</h3>
                <ul>
                      {['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'].map((time) => (
                        <li
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={selectedTime === time ? 'selected-time' : ''}
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
              </div>
              <div className='pop-up-form-inner-afternoon'>
              <h3><WbSunnyIcon style={{fontSize:'20px', marginLeft:'10px',marginRight:'5px'}}/> Afternoon</h3>
              <ul>
                      {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'].map((time) => (
                        <li
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={selectedTime === time ? 'selected-time' : ''}
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
              </div>
              <div className='pop-up-form-inner-evening'>
              <h3><BedtimeIcon style={{fontSize:'20px', marginLeft:'10px',marginRight:'5px'}}/> Evening</h3>
              <ul>
                      {['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'].map((time) => (
                        <li
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={selectedTime === time ? 'selected-time' : ''}
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
              </div>
              </>
              ) : (
                <div className="enquiry-form"> {/* CHANGE 12: Added Enquiry tab content */}
                  <h2>Enquiry Form</h2>
                  <p>Please provide your details to confirm the appointment.</p>
                  {selectedTime && (
                    <p>Selected Appointment: {formatDate(currentDate)} at {selectedTime}</p>
                  )}
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={enquiryForm.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={enquiryForm.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={enquiryForm.message}
                        onChange={handleFormChange}
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="book-button">Book</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
        <div className={`mobile-dropdown ${mobileMenuOpen ? 'active' : ''}`}>
          <form onSubmit={handleSearch} className="mobile-search-container">
            <div className='search-part'>
              <SearchOutlinedIcon style={{ color: 'grey', paddingLeft: '10px' }} />
              <input 
                type="text" 
                placeholder="Find Services"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  e.target.style.fontSize = '14px';
                  e.target.style.color = '#313133';
                }}
              />
            </div>
            <button type="submit">Search</button>
          </form>
          <div className='mobile-book-appointment'>
            <button onClick={() => {
              setIsPopUpFormOpen(!isPopUpFormOpen);
              setMobileMenuOpen(false);
            }}>Book Appointment</button>
          </div>
          <div className='mobile-nav-links'>
            {navLinks.map((link, index) => (
              <div key={index} className='mobile-nav-item'>
                {link.subLinks ? (
                  <>
                    {/* *** CHANGE 7: Use link.id for top-level menu toggle *** */}
                    <span 
                      className='mobile-nav-title' 
                      onClick={() => toggleDropdown(link.id)}
                    >
                      {link.title} <KeyboardArrowDownOutlinedIcon style={{ fontSize: '20px' }} />
                    </span>
                    {/* *** CHANGE 8: Check activeDropdowns.includes(link.id) *** */}
                    {activeDropdowns.includes(link.id) && (
                      <ul className='mobile-sub-links'>
                        {link.subLinks.map((subLink, subIndex) => (
                          <li key={subIndex}>
                            <span 
                              className='mobile-sub-title' 
                              onClick={() => toggleDropdown(subLink.id)}
                            >
                              {subLink.title} <KeyboardArrowDownOutlinedIcon style={{ fontSize: '18px' }} />
                            </span>
                            {/* *** CHANGE 9: Check activeDropdowns.includes(subLink.id) *** */}
                            {activeDropdowns.includes(subLink.id) && (
                              <ul className='mobile-sub-sub-links'>
                                {subLink.links.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link 
                                      to={item.path} 
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link 
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      
  )
}

export default Navbar


