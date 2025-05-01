// frontend/src/components/Blogs.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './blogs.css';
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blogs.length) return <div>No blogs available</div>;

  return (
    <div className="blogs">
      <NavbarTop/>
      <Navbar/>
      <NavbarBottom/>
      <h2>Our Blogs</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <p><em>By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
            <Link to={`/blogs/${blog._id}`} className="read-more">
              Read More
            </Link>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Blogs;