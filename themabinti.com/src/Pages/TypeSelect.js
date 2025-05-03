import React from "react";
import { useNavigate } from "react-router-dom";
import "./TypeSelect.css";

const TypeSelect = () => {
  const navigate = useNavigate();

  const handleBuyerSelect = () => {
    localStorage.setItem("userType", "buyer");
    navigate("/signup");
  };

  const handleSellerSelect = () => {
    localStorage.setItem("userType", "seller");
    navigate("/choose-package");
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Join themabinti.com</h1>
        <p>Choose how you want to use our platform</p>
      </div>

      <div className="grid">
        <div className="card">
          <div className="card-header">
            <h2>I want to buy services</h2>
            <p className="card-description">
              Browse and purchase services from our community of professionals
            </p>
          </div>
          <div className="card-content">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={handleBuyerSelect} className="button">
              Continue as Buyer
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>I want to sell services</h2>
            <p className="card-description">
              Offer your professional services to our growing community
            </p>
          </div>
          <div className="card-content">
            <div className="icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={handleSellerSelect} className="button">
              Continue as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeSelect;
