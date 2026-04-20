import React from 'react';
import './TrustBanner.css';

const TrustBanner = () => {
  return (
    <div className="trust-banner-container">
      <div className="trust-banner">
        
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <div className="trust-text">
            <h4>FAST SHIPPING & RETURNS</h4>
            <p>Quick US delivery with a 7-day hassle-free return window.</p>
          </div>
        </div>

        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <div className="trust-text">
            <h4>BOUJEE REWARDS</h4>
            <p>Join The Boujee Barn Boutique for discounts & exclusive offers.</p>
          </div>
        </div>

        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <line x1="7" y1="15" x2="7.01" y2="15"></line>
            <line x1="11" y1="15" x2="13" y2="15"></line>
          </svg>
          <div className="trust-text">
            <h4>BOUTIQUE GIFT CARDS</h4>
            <p>The perfect gift for any cowgirl. Available securely online.</p>
          </div>
        </div>

        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <div className="trust-text">
            <h4>5.0 GOOGLE REVIEWS</h4>
            <p>Top-rated Western Boho boutique experience by our customers</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustBanner;
