const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Define valid subcategories for validation
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

// Get services by subcategory
router.get('/', async (req, res) => {
  try {
    const { subcategory } = req.query;
    console.log('Fetching services for subcategory:', subcategory);

    // Validate subcategory
    if (!subcategory) {
      console.log('No subcategory provided');
      return res.status(400).json({ message: 'Subcategory is required' });
    }

    // Check if subcategory is valid
    const isValidSubcategory = Object.values(validSubcategories)
      .flat()
      .includes(subcategory);
    if (!isValidSubcategory) {
      console.log('Invalid subcategory:', subcategory);
      return res.status(400).json({ message: 'Invalid subcategory' });
    }

    const services = await Service.find({
      subcategory: { $regex: subcategory, $options: 'i' },
    }).populate('userId', 'userName');

    console.log('Found services:', services.length);
    res.json(services);
  } catch (err) {
    console.error('Error fetching services by subcategory:', err.message, err.stack);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

module.exports = router;