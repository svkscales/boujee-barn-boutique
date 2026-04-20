import React, { useState, useRef } from 'react';
import { Confetti } from './ui/confetti';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const confettiRef = useRef(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // To use Mailchimp, set VITE_MAILCHIMP_API_KEY in your deployment environment variables (.env)
    const API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY || 'your_api_key_here';
    const LIST_ID = '6ea3f2773c';
    const DATACENTER = API_KEY.split('-')[1];

    try {
      const response = await fetch(`/api/mailchimp/3.0/lists/${LIST_ID}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('anystring:' + API_KEY)}`
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'
        })
      });

      if (response.ok) {
        setStatus('success');
        confettiRef.current?.fire({
          particleCount: 150,
          spread: 80,
          colors: ['#000000', '#ffffff', '#EAA7B2', '#b87a84']
        });
      } else {
        const data = await response.json();
        if (data.title === "Member Exists") {
           // If they are already subscribed, treat it as a success for the user UX
          setStatus('success');
          confettiRef.current?.fire({
            particleCount: 150,
            spread: 80,
            colors: ['#000000', '#ffffff', '#EAA7B2', '#b87a84']
          });
        } else {
          console.error("Mailchimp API Object:", data);
          setStatus('error');
        }
      }
    } catch (error) {
      console.error("Mailchimp REST Fetch Error:", error);
      setStatus('error');
    }
  };

  return (
    <>
      <section className="newsletter-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <Confetti 
          ref={confettiRef} 
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
          manualstart={true} 
        />
        <div className="container newsletter-content" style={{ position: 'relative', zIndex: 1 }}>
          <h2>Join The Boujee Barn</h2>
          <p>Subscribe for exclusive access to new drops, secret sales, and styling inspiration delivered straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'success' || status === 'loading'}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={status === 'success' || status === 'loading'}
              style={{
                backgroundColor: status === 'success' ? '#2F4F4F' : status === 'error' ? '#8B0000' : '',
                borderColor: status === 'success' ? '#2F4F4F' : status === 'error' ? '#8B0000' : '',
                transition: 'all 0.4s ease',
                minWidth: '140px'
              }}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Subscribed' : status === 'error' ? 'Failed - Try again' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>Boujee Barn</h2>
            <p>Be Bold. Be Beautiful. Be Boujee.</p>
            <div className="social-icons" style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem', opacity: '0.9' }}>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@boujee_barn_boutique?_r=1&_t=ZN-95TmAc8btCw" target="_blank" rel="noopener noreferrer" style={{ padding: '0.2rem', display: 'flex' }} aria-label="TikTok">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/the_boujee_barn_boutique_?igsh=cDh0Z2N5d3ljdWVu" target="_blank" rel="noopener noreferrer" style={{ padding: '0.2rem', display: 'flex' }} aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1Aw9hRTQc4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ padding: '0.2rem', display: 'flex' }} aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Mail */}
              <a href="mailto:jcworth85@boujeebarnboutique.net" aria-label="Email Us" style={{ padding: '0.2rem', display: 'flex' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Shop</h4>
            <a href="#graphic-tees">Graphic Tees</a>
            <a href="#dresses">Dresses</a>
            <a href="#jeans">Jeans</a>
            <a href="#accessories">Accessories</a>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
            <a href="#contact">Location</a>
            <a href="#contact">Opening Times</a>
          </div>
          <div className="footer-links">
            <h4>Policies</h4>
            <a href="#returns">Return/Exchange Policy</a>
            <a href="#shipping">Shipping Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container" style={{ textAlign: 'center' }}>
            <p>&copy; 2026 Boujee Barn Boutique. All Rights Reserved. Located in Jacksonville, IL.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
