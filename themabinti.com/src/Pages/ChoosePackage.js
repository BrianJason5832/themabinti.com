import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChoosePackage.css";

const packages = [
  {
    id: "basic",
    name: "Basic",
    price: 800,
    features: [
      "1 Photo Upload",
      "Book Appointment Feature",
      "Basic Visibility",
      "Mabinti Community Access"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: 1500,
    features: [
      "2 Photo Uploads",
      "Book Appointment Feature",
      "Enhanced Visibility",
      "Mabinti Community Access"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 2500,
    features: [
      "3 Photo Uploads",
      "1 Video Upload",
      "Book Appointment Feature",
      "Premium Visibility",
      "Featured Listing",
      "Mabinti Community Access"
    ]
  }
];

const ChoosePackage = () => {
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState(null);

  const handleContinue = () => {
    if (!selectedPkg) {
      alert("Please select a package");
      return;
    }

    localStorage.setItem("selectedPackage", selectedPkg);
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Choose Your Package</h1>
        <p>Select a package that fits your needs as a seller</p>
      </div>

      <div className="grid">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`card ${selectedPkg === pkg.id ? "selected" : ""}`}
            onClick={() => setSelectedPkg(pkg.id)}
          >
            <div className="card-header">
              <div className="card-title-container">
                <h2>{pkg.name}</h2>
                {pkg.recommended && <span className="badge">Recommended</span>}
              </div>
              <div className="price">
                <span>Ksh {pkg.price}</span>
              </div>
            </div>
            <div className="card-content">
              <ul className="features-list">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="check-mark">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <button
                className={`select-button ${selectedPkg === pkg.id ? "selected" : ""}`}
                onClick={() => setSelectedPkg(pkg.id)}
              >
                {selectedPkg === pkg.id ? "Selected" : "Select Package"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue-button-container">
        <button onClick={handleContinue} disabled={!selectedPkg} className="continue-button">
          Continue to Sign Up
        </button>
      </div>
    </div>
  );
};

export default ChoosePackage;
