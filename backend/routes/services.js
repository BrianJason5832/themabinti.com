const express = require('express');
const jwt = require('jsonwebtoken');
const Service = require('../models/Service');
const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    console.log('Decoded token:', decoded);
    req.user = decoded; // { userId, userName, email }
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Define valid subcategories for each category
const validSubcategories = {
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
  'Health': [
    'Skin Consultation',
    'Mental Health',
    'Maternal Care',
    'Reproductive Care',
  ],
  'Fitness': ['Gym', 'Personal Trainers', 'Nutritionist'],
  'Fashion': ['African', 'Maasai Wear', 'Crotchet', 'Personal Stylist'],
  'Bridal': ['Bridal Makeup', 'Bridal Hair', 'Maids for Hire', 'Gowns for Hire'],
  'Flowers & Gifts': ['Personalized gifts', 'Customized Gifts'],
  'Home & Lifestyle': ['Cleaning Services', 'Laundry Services'],
  'Photography': ['Event', 'Lifestyle', 'Portrait'],
};

// Post a service
router.post('/', authMiddleware, async (req, res) => {
  const { name, image, minPrice, maxPrice, location, phoneNumber, category, subcategory } = req.body;
  console.log('Received payload:', {
    name,
    image: image?.slice(0, 50),
    minPrice,
    maxPrice,
    location,
    phoneNumber,
    category,
    subcategory,
  });

  try {
    // Validate inputs
    if (!name || !image || minPrice === undefined || maxPrice === undefined || !location || !phoneNumber || !category || !subcategory) {
      console.log('Validation failed:', {
        name: !!name,
        image: !!image,
        minPrice,
        maxPrice,
        location: !!location,
        phoneNumber: !!phoneNumber,
        category: !!category,
        subcategory: !!subcategory,
      });
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert to numbers and validate
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (isNaN(min) || isNaN(max)) {
      console.log('Invalid number format:', { minPrice, maxPrice });
      return res.status(400).json({ message: 'Prices must be valid numbers' });
    }
    if (min < 0 || max < 0) {
      console.log('Negative price detected:', { min, max });
      return res.status(400).json({ message: 'Prices cannot be negative' });
    }
    if (min > max) {
      console.log('Invalid price range:', { min, max });
      return res.status(400).json({ message: 'Minimum price cannot exceed maximum price' });
    }

    // Validate subcategory
    if (!validSubcategories[category] || !validSubcategories[category].includes(subcategory)) {
      console.log('Invalid subcategory:', { category, subcategory });
      return res.status(400).json({ message: 'Invalid subcategory for the selected category' });
    }

    const service = new Service({
      userId: req.user.userId,
      name,
      image,
      minPrice: min,
      maxPrice: max,
      location,
      phoneNumber,
      category,
      subcategory,
    });

    console.log('Saving service:', {
      userId: req.user.userId,
      name,
      image: image?.slice(0, 50),
      minPrice: min,
      maxPrice: max,
      location,
      phoneNumber,
      category,
      subcategory,
    });

    await service.save();
    console.log('Service saved:', service._id);

    res.status(201).json({ message: 'Service posted successfully', service });
  } catch (err) {
    console.error('Server error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// Search services by name or location
router.get('/search', async (req, res) => {
  const { query } = req.query;
  console.log('Search query:', query);

  try {
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const services = await Service.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    console.log('Found services:', services.length);
    res.json(services);
  } catch (err) {
    console.error('Search error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// In backend/routes/services.js
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    const query = location ? { location: { $regex: location, $options: 'i' } } : {};
    const services = await Service.find(query).populate('userId', 'userName');
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get latest 6 services by category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  console.log('Fetching services for category:', category);

  try {
    if (!Object.keys(validSubcategories).includes(category)) {
      console.log('Invalid category:', category);
      return res.status(400).json({ message: 'Invalid category' });
    }

    const services = await Service.find({ category })
      .sort({ createdAt: -1 }) // Latest first
      .limit(6); // Max 6 services
    console.log('Found services:', services.length);

    res.json(services);
  } catch (err) {
    console.error('Server error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

module.exports = router;