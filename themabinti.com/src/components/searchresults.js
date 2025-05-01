import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard'; // Import ProductCard
import './searchresults.css';
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

const SearchResults = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract query from URL
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/services/search', {
          params: { query },
        });
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results');
        setLoading(false);
      }
    };

    if (query) {
      fetchServices();
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className="search-results">
      <NavbarTop />
      <Navbar />
      <NavbarBottom />
      <h2>Search Results for "{query}"</h2>
      <p>{error}</p>
      <Link to="/">Back to Home</Link>
      <Footer />
    </div>
  );
  if (!services.length && !loading) {
    return (
      <div className="search-results">
        <NavbarTop />
        <Navbar />
        <NavbarBottom />
        <h2>Search Results for "{query}"</h2>
        <p>No services found for "{query}"</p>
        <Link to="/">Back to Home</Link>
        <Footer />
      </div>
    );
  }

  return (
    <div className="search-results">
      <NavbarTop />
      <Navbar />
      <NavbarBottom />
      <h2>Search Results for "{query}"</h2>
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
      <Footer />
    </div>
  );
};

export default SearchResults;