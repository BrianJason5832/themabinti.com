// frontend/src/components/PostBlog.js
import React, { useState } from 'react';
import axios from 'axios';
import './postblog.css';

const PostBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
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
      const response = await axios.post('http://localhost:5000/api/blogs', formData);
      setStatus('Blog posted successfully!');
      setFormData({ title: '', content: '', author: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post blog');
    }
  };

  return (
    <div className="post-blog">
      <h2>Write a Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Post Blog</button>
        {status && <p className="success">{status}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default PostBlog;