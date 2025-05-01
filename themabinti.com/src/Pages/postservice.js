import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeckIcon from '@mui/icons-material/Deck';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import './postservice.css';
import logo from '../themabinti.png'

// Define categories and their subcategories
const categories = {
  'Beauty Services': [
    'Makeup',
    'Nails',
    'Eyebrows & Lashes',
    'Microblading',
    'Tattoo & Piercings',
    'Waxing',
    'ASMR & Massage',
    'Beauty hub',
  ],
  'Hair Services': [
    'Braiding',
    'Weaving',
    'Locs',
    'Wig Makeovers',
    'Ladies Haircut',
    'Complete Hair Care',
  ],
  Health: [
    'Skin Consultation',
    'Mental Health',
    'Maternal Care',
    'Reproductive Care',
  ],
  Fitness: ['Gym', 'Personal Trainers', 'Nutritionist'],
  Fashion: ['African', 'Maasai Wear', 'Crotchet', 'Personal Stylist'],
  Bridal: ['Bridal Makeup', 'Bridal Hair', 'Maids for Hire', 'Gowns for Hire'],
  'Flowers & Gifts': ['Personalized gifts', 'Customized Gifts'],
  'Home & Lifestyle': ['Cleaning Services', 'Laundry Services'],
  Photography: ['Event', 'Lifestyle', 'Portrait'],
};

function PostService() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!image || !name || !minPrice || !maxPrice || !location || !phoneNumber || !category || !subcategory) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (min < 0 || max < 0) {
      setError('Prices cannot be negative');
      setLoading(false);
      return;
    }
    if (min > max) {
      setError('Minimum price cannot exceed maximum price');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('You must be logged in to post a service');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/services',
        {
          name,
          image,
          minPrice: min,
          maxPrice: max,
          location,
          phoneNumber,
          category,
          subcategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Service posted successfully!');
      setImage(null);
      setName('');
      setMinPrice('');
      setMaxPrice('');
      setLocation('');
      setPhoneNumber('');
      setCategory('');
      setSubcategory('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <img src={logo} sx={{ width:'200px', height:'100px', marginLeft:'25%' }} />
        <Typography variant="h4" gutterBottom>
          Post a Service
        </Typography>
        <Typography variant="body1" gutterBottom>
          Share your services with the Mabinti community.
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" component="label" sx={{ backgroundColor: '#a25aff' }}>
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {image && (
            <Box sx={{ mt: 2 }}>
              <img src={image} alt="Service Preview" style={{ maxWidth: '200px' }} />
            </Box>
          )}
        </Box>
        <TextField
          fullWidth
          label="Minimum Price (Ksh)"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Maximum Price (Ksh)"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange} required>
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {Object.keys(categories).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} disabled={!category}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          >
            <MenuItem value="" disabled>
              Select a subcategory
            </MenuItem>
            {category &&
              categories[category].map((subcat) => (
                <MenuItem key={subcat} value={subcat}>
                  {subcat}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ backgroundColor: '#a25aff' }}
        >
          {loading ? 'Posting...' : 'Post Service'}
        </Button>
      </form>
    </Container>
  );
}

export default PostService;