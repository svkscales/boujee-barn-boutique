import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = '#search=' + encodeURIComponent(searchQuery.trim().replace(/\s+/g, '-'));
    }
  };
  return (
    <>
      {/* Top Utility Banner */}
      <div className="shipping-banner">
        <p>FAST DOMESTIC US SHIPPING (5-7 DAYS) <span>|</span> JACKSONVILLE, IL <span>|</span> USD ($)</p>
      </div>

      {/* Mobile Slide-out Menu */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div className={`mobile-side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>The Boutique</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-links">
          <a href="#tops" onClick={() => setIsMobileMenuOpen(false)}>Tops</a>
          <a href="#bottoms" onClick={() => setIsMobileMenuOpen(false)}>Bottoms</a>
          <a href="#dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses</a>
          <a href="#dancewear" onClick={() => setIsMobileMenuOpen(false)}>Dancewear</a>
          <a href="#accessories" onClick={() => setIsMobileMenuOpen(false)}>Accessories</a>
          <a href="#childrens" onClick={() => setIsMobileMenuOpen(false)}>Childrens</a>
          <a href="#toys" onClick={() => setIsMobileMenuOpen(false)}>Toys</a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <button 
          className="mobile-hamburger" 
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="nav-left">
          <div className="nav-dropdown">
            <a href="#tops">Tops</a>
            <div className="dropdown-menu mega-menu left-aligned">
              <div className="mega-image-container">
                <img src="/tops_placeholder.png" alt="Tops Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Tops</h4>
                <div className="mega-links">
                  <a href="#jackets">Jackets</a>
                  <a href="#short-sleeve">Short Sleeve</a>
                  <a href="#long-sleeve">Long Sleeve</a>
                  <a href="#graphic-tees">Graphic Tees</a>
                  <a href="#tanks">Tanks</a>
                  <a href="#sweatshirts">Sweatshirts</a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#bottoms">Bottoms</a>
            <div className="dropdown-menu mega-menu left-aligned">
              <div className="mega-image-container">
                <img src="/bottoms_placeholder.png" alt="Bottoms Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Bottoms</h4>
                <div className="mega-links">
                  <a href="#jeans">Jeans</a>
                  <a href="#pants">Pants</a>
                  <a href="#overalls">Overalls</a>
                  <a href="#sweatpants">Sweatpants</a>
                  <a href="#skirts">Skirts</a>
                  <a href="#shorts">Shorts</a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#dresses">Dresses</a>
            <div className="dropdown-menu mega-menu left-aligned">
              <div className="mega-image-container">
                <img src="/dresses_placeholder.png" alt="Dresses Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Dresses</h4>
                <div className="mega-links">
                  <a href="#mini">Mini</a>
                  <a href="#midi">Midi</a>
                  <a href="#maxi">Maxi</a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#dancewear">Dancewear</a>
            <div className="dropdown-menu mega-menu left-aligned">
              <div className="mega-image-container">
                <img src="/dancewear_placeholder.png" alt="Dancewear Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Dancewear</h4>
                <div className="mega-links">
                  <a href="#leotards">Leotards</a>
                  <a href="#tops-dance">Tops</a>
                  <a href="#bottoms-dance">Bottoms</a>
                  <a href="#sets">Sets</a>
                  <a href="#warmups">Warmups</a>
                  <a href="#dance-accessories">Accessories</a>
                  <a href="#dance-shoes">Shoes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="nav-logo">
          <a href="#">The Boujee Barn</a>
        </div>
        
        <div className="nav-right">
          <div className="nav-dropdown">
            <a href="#accessories">Accessories</a>
            <div className="dropdown-menu mega-menu">
              <div className="mega-image-container">
                <img src="/mega_menu_placeholder.png" alt="Accessories Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Accessories</h4>
                <div className="mega-links">
                  <a href="#jewelry">Jewelry</a>
                  <a href="#fragrance">Fragrance</a>
                  <a href="#candles">Candles</a>
                  <a href="#hats">Hats</a>
                  <a href="#handbags">Handbags</a>
                  <a href="#clutches">Clutches</a>
                  <a href="#shoes">Shoes</a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#childrens">Childrens</a>
            <div className="dropdown-menu mega-menu">
              <div className="mega-image-container">
                <img src="/childrens_placeholder.png" alt="Childrens Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Childrens</h4>
                <div className="mega-links">
                  <a href="#childrens-jackets">Jackets</a>
                  <a href="#childrens-tops">Tops</a>
                  <a href="#childrens-jeans">Jeans</a>
                  <a href="#childrens-pants">Pants</a>
                  <a href="#childrens-shorts">Shorts</a>
                  <a href="#childrens-skirts">Skirts</a>
                  <a href="#childrens-dresses">Dresses</a>
                  <a href="#childrens-accessories">Accessories</a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="#toys">Toys</a>
            <div className="dropdown-menu mega-menu">
              <div className="mega-image-container">
                <img src="/toys_placeholder.png" alt="Toys Showcase" />
              </div>
              <div className="mega-links-container">
                <h4 className="mega-title">Toys</h4>
                <div className="mega-links">
                  <a href="#plush-toys">Plush Toys</a>
                  <a href="#games">Games</a>
                  <a href="#educational-toys">Educational Toys</a>
                  <a href="#sensory-toys">Sensory Toys</a>
                  <a href="#seasonal-novelty">Seasonal / Novelty</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="search-wrapper" tabIndex="0" aria-label="Search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <a 
          href="#" 
          className="cart-btn" 
          aria-label="Cart" 
          onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8h14l1 13H4L5 8z" />
            <path d="M9 8v-2a3 3 0 0 1 6 0v2" />
          </svg>
          {cart?.totalQuantity > 0 && (
            <span className="cart-badge" style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-10px', 
              backgroundColor: 'var(--text-primary)', 
              color: 'var(--white)', 
              fontSize: '0.65rem', 
              fontWeight: 'bold', 
              padding: '2px 6px', 
              borderRadius: '50%',
              pointerEvents: 'none'
            }}>
              {cart.totalQuantity}
            </span>
          )}
        </a>

        {/* Search Dropdown Banner */}
        <div className="search-banner">
          <form className="search-input-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search the boutique..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit" aria-label="Submit Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
