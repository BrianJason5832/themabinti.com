// frontend/src/components/BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './blogdetail.css';
import NavbarTop from '../NavbarTop';
import Navbar from '../Navbar';
import NavbarBottom from '../NavbarBottom';
import Footer from '../Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
        <NavbarTop/>
        <Navbar/>
        <NavbarBottom/>
        <div className='blog-detail-inner'>
        <h2>{blog.title}</h2>
        <p><em>By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</em></p>
        <div className="content">{blog.content}</div>
        </div>
        <Footer/>
    </div>
  );
};

export default BlogDetail;