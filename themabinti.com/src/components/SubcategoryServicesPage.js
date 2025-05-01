import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard';
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

const SubcategoryServicesPage = () => {
  const { category, subcategory } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Normalize subcategory for API request
        const normalizedSubcategory = subcategory
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        console.log('Normalized subcategory:', normalizedSubcategory);

        // Fetch services by subcategory using the new endpoint
        const response = await axios.get(`/api/services/subcategory?subcategory=${normalizedSubcategory}`);
        console.log('Fetched services:', response.data);

        // No client-side filtering needed since backend handles it
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [subcategory]);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return (
      <div className="subcategory-services-page">
        <h1>{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Services</h1>
        <p>{error}</p>
        <Link to="/">Browse all services</Link>
      </div>
    );
  }

  return (
    <div className='subcategories-container'>
    <NavbarTop/>
    <Navbar/>
    <NavbarBottom/>
    <div className="subcategory-services-page">
      <h1>{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Services</h1>
      {services.length === 0 ? (
        <div>
          <p>No services found for {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}.</p>
          <Link to="/">Browse all services</Link>
        </div>
      ) : (
        <div className="services-list">
          {services.map((service) => (
            <ProductCard
              key={service._id}
              image={service.image}
              name={service.name}
              price={`KSh ${service.minPrice} - ${service.maxPrice}`}
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

export default SubcategoryServicesPage;