import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Products.css';
import Categories from './Categories';

function Products() {
  const [beautyServices, setBeautyServices] = useState([]);
  const [hairServices, setHairServices] = useState([]);
  const [fashionServices, setFashionServices] = useState([]);
  const [healthServices, setHealthServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch services for a category
  const fetchServices = async (category, setState) => {
    try {
      console.log(`Fetching services for ${category}`);
      const url = `/api/services/${encodeURIComponent(category)}`;
      console.log(`Request URL: ${url}`);
      const response = await axios.get(url);
      console.log(`${category} response:`, response.data);
      setState(response.data);
    } catch (err) {
      console.error(`Error fetching ${category}:`, {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setErrors((prev) => ({ ...prev, [category]: `Failed to load ${category}` }));
    }
  };

  // Load all services on mount
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      await Promise.all([
        fetchServices('Beauty Services', setBeautyServices),
        fetchServices('Hair Services', setHairServices),
        fetchServices('Fashion', setFashionServices),
        fetchServices('Health', setHealthServices),
      ]);
      setLoading(false);
    };
    loadServices();
  }, []);

  // Render ProductCard components for a list of services
  const renderProductCards = (services, category) => {
    if (errors[category]) {
      return <p className="error">{errors[category]}</p>;
    }
    if (!services || services.length === 0) {
      return <p className="empty-category">No services available in this category.</p>;
    }
    return services.map((service) => (
      <ProductCard
        key={service._id}
        image={service.image}
        name={service.name}
        price={`Ksh${service.minPrice}-Ksh${service.maxPrice}`}
        location={service.location}
        phoneNumber={service.phoneNumber}
      />
    ));
  };

  return (
    <div className="products">
      {loading && <p>Loading services...</p>}
      <div className="row1">
        <div className="row1-title">
          <h2>Beauty Services</h2>
        </div>
        <div className="row-products">{renderProductCards(beautyServices, 'Beauty Services')}</div>
      </div>
      <div className="row2">
        <div className="row1-title">
          <h2>Hair Services</h2>
        </div>
        <div className="row-products">{renderProductCards(hairServices, 'Hair Services')}</div>
      </div>
      <div className="category-row">
        <Categories />
      </div>
      <div className="row3">
        <div className="row1-title">
          <h2>Fashion</h2>
        </div>
        <div className="row-products">{renderProductCards(fashionServices, 'Fashion')}</div>
      </div>
      <div className="row4">
        <div className="row1-title">
          <h2>Health</h2>
        </div>
        <div className="row-products">{renderProductCards(healthServices, 'Health')}</div>
      </div>
    </div>
  );
}

export default Products;