const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Matches req.user.userId from authMiddleware
  name: { type: String, required: true }, // Service name (e.g., "Carol Nails")
  image: { type: String, required: true }, // Base64 string
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Beauty Services',
      'Hair Services',
      'Health',
      'Fitness',
      'Fashion',
      'Bridal',
      'Flowers & Gifts',
      'Home & Lifestyle',
      'Photography',
    ],
  },
  subcategory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', serviceSchema);