import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostYourService.css";

const categories = [
  { value: "beauty", label: "Beauty & Wellness" },
  { value: "home", label: "Home Services" },
  { value: "professional", label: "Professional Services" },
  { value: "education", label: "Education & Training" },
  { value: "events", label: "Events & Entertainment" },
];

const subcategories = {
  beauty: [
    { value: "hairdressing", label: "Hairdressing" },
    { value: "makeup", label: "Makeup" },
    { value: "nails", label: "Nail Care" },
    { value: "skincare", label: "Skin Care" },
  ],
  home: [
    { value: "cleaning", label: "Cleaning" },
    { value: "repair", label: "Repair & Maintenance" },
    { value: "gardening", label: "Gardening" },
    { value: "cooking", label: "Cooking & Catering" },
  ],
  professional: [
    { value: "accounting", label: "Accounting" },
    { value: "legal", label: "Legal Services" },
    { value: "consulting", label: "Consulting" },
    { value: "design", label: "Design" },
  ],
  education: [
    { value: "tutoring", label: "Tutoring" },
    { value: "language", label: "Language Classes" },
    { value: "skills", label: "Skills Training" },
    { value: "coaching", label: "Coaching" },
  ],
  events: [
    { value: "photography", label: "Photography" },
    { value: "planning", label: "Event Planning" },
    { value: "entertainment", label: "Entertainment" },
    { value: "catering", label: "Catering" },
  ],
};

const PostYourService = () => {
  const navigate = useNavigate();
  const selectedPackage = localStorage.getItem("selectedPackage") || "basic";

  const [formData, setFormData] = useState({
    serviceName: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    phoneNumber: "",
    category: "",
    subcategory: "",
    description: "",
  });

  const [photoCount, setPhotoCount] = useState(selectedPackage === "premium" ? 3 : selectedPackage === "standard" ? 2 : 1);
  const [videoAllowed, setVideoAllowed] = useState(selectedPackage === "premium");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name) => (value) => {
    if (name === "category") {
      setSelectedCategory(value);
      setFormData({
        ...formData,
        category: value,
        subcategory: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (photoFiles.length + newFiles.length > photoCount) {
        alert(`Upload limit exceeded. Your package allows only ${photoCount} photos`);
        return;
      }
      setPhotoFiles([...photoFiles, ...newFiles]);
    }
  };

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const removePhoto = (index) => {
    setPhotoFiles(photoFiles.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideoFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.serviceName || !formData.minPrice || !formData.maxPrice || !formData.location || !formData.phoneNumber) {
      alert("Missing required fields. Please fill all the required fields");
      return;
    }

    console.log("Form Data:", formData);
    console.log("Photos:", photoFiles);
    console.log("Video:", videoFile);

    alert("Service posted successfully! Your service has been posted to the Mabinti community.");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Post Your Service</h1>
        <p>Share your services with themabinti community</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <h2>Service Details</h2>
          </div>
          <div className="card-content">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceName">Service Name *</label>
                <input
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  placeholder="e.g. Professional Makeup Service"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minPrice">Minimum Price (Ksh) *</label>
                  <input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    value={formData.minPrice}
                    onChange={handleInputChange}
                    placeholder="e.g. 1000"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxPrice">Maximum Price (Ksh) *</label>
                  <input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    value={formData.maxPrice}
                    onChange={handleInputChange}
                    placeholder="e.g. 5000"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Nairobi CBD"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 0712345678"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleSelectChange("category")(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subcategory">Subcategory</label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => handleSelectChange("subcategory")(e.target.value)}
                    disabled={!selectedCategory}
                  >
                    <option value="">Select subcategory</option>
                    {selectedCategory &&
                      subcategories[selectedCategory]?.map((subcategory) => (
                        <option key={subcategory.value} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your service in detail..."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Media Upload</h2>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label>Photos ({photoFiles.length}/{photoCount})</label>
              <div className="upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={photoFiles.length >= photoCount}
                  multiple={photoCount > 1}
                />
              </div>
              {photoFiles.length > 0 && (
                <div className="photo-grid">
                  {photoFiles.map((file, index) => (
                    <div key={index} className="photo-item">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index}`}
                        className="photo-preview"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="remove-button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {videoAllowed && (
              <div className="form-group">
                <label>Video (Optional, max 1)</label>
                <div className="upload-container">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={!!videoFile}
                  />
                </div>
                {videoFile && (
                  <div className="video-item">
                    <video controls className="video-preview">
                      <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="remove-button"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">
            Post Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostYourService;
