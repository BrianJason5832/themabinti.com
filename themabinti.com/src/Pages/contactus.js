// src/components/ContactUs.js
import React, { useState } from 'react';
import axios from 'axios';
import './contactus.css'; // Create this CSS file for styling
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-us">
    <NavbarTop/>
    <Navbar/>
    <NavbarBottom/>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
        {status && <p className="success">{status}</p>}
        {error && <p className="error">{error}</p>}
      </form>
      <Footer/>
    </div>
  );
};

export default ContactUs;