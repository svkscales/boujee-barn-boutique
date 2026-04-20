import React from 'react';

const FeaturedProducts = () => {
  return (
    <>
      <section className="featured-products" id="shop-the-edit">
        <div className="container">
          <div className="section-header line-header">
            <h2>Shop The Edit</h2>
            <a href="#" className="view-all">View Full Range</a>
          </div>

          <div className="grid-4">
            <div className="product-card">
              <div className="product-img"></div>
              <div className="product-info">
                <h4>Leather Fringe Jacket</h4>
                <p className="price">$145.00</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-img"></div>
              <div className="product-info">
                <h4>Desert Rose Maxi Dress</h4>
                <p className="price">$89.00</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-img"></div>
              <div className="product-info">
                <h4>Turquoise Squash Blossom</h4>
                <p className="price">$210.00</p>
              </div>
            </div>
            <div className="product-card">
              <div className="product-img"></div>
              <div className="product-info">
                <h4>Vintage Wash Flare Jeans</h4>
                <p className="price">$75.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bnpl-banner">
        <div className="container">
          <h2>E-Gift Cards</h2>
          <p style={{ marginBottom: '0' }}>Give the gift of the Boujee Barn boutique.</p>
          <a href="#gift-cards" style={{ textDecoration: 'underline', marginTop: '1.5rem', display: 'inline-block', color: 'var(--text-primary)', fontSize: '0.9rem' }}>SHOP NOW</a>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
