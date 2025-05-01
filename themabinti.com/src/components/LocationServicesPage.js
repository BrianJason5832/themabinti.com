import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard';
import './LocationServicesPage.css';
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

// Set axios base URL
axios.defaults.baseURL = 'http://localhost:5000';

const LocationServicesPage = () => {
  const { location } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`/api/services?location=${location}`);
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.status === 404
          ? `Services are not available for ${location.charAt(0).toUpperCase() + location.slice(1)}. Please try another location.`
          : 'Failed to load services. Please try again later.');
        setLoading(false);
      }
    };
    fetchServices();
  }, [location]);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return (
      <div className="location-services-page">
        <h1>Services in {location.charAt(0).toUpperCase() + location.slice(1)}</h1>
        <p>{error}</p>
        <Link to="/">Browse all services</Link>
      </div>
    );
  }

  return (
    <div className='container'>
      <NavbarTop/>
      <Navbar/>
      <NavbarBottom/>
      <div className="location-services-page">
      
      <h1>Services in {location.charAt(0).toUpperCase() + location.slice(1)}</h1>
      {services.length === 0 ? (
        <div>
          <p>No services found in {location.charAt(0).toUpperCase() + location.slice(1)}. Try another location.</p>
          <Link to="/">Browse all services</Link>
        </div>
      ) : (
        <div className="services-list">
          {services.map((service) => (
            <ProductCard
              key={service._id}
              image={service.image}
              name={service.name}
              price={`KSh ${service.minPrice} - ${service.maxPrice}`} // Format price range
              location={service.location}
              phoneNumber={service.phoneNumber}
            />
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default LocationServicesPage;