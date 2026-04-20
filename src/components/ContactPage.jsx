import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <section className="contact-hero vibe-section" style={{ backgroundColor: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div className="contact-slash-banner"></div>
        <div className="container contact-layout" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Left Column: Contact Structure */}
          <div className="contact-content-column">
            <h2 className="contact-title">Contact <em>The Boutique</em></h2>
            
            <div className="contact-details" style={{ marginBottom: '3rem' }}>
              <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone Number</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>+1 (217) 370-6800</p>
              </div>
              
              <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>jcworth85@boujeebarnboutique.net</p>
              </div>
              
              <div className="contact-item" style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Facebook</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}><a href="https://www.facebook.com/share/1Aw9hRTQc4/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>@TheBoujeeBarnBoutique</a></p>
              </div>
            </div>

            <div className="location-section" style={{ borderTop: '1px solid var(--sand-bg)', paddingTop: '2rem' }}>
              <div className="contact-location-layout">
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Location</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    The Boujee Barn Boutique<br />
                    52 N Central Park<br />
                    Jacksonville, IL 62650<br />
                    United States
                  </p>
                  <a href="https://maps.app.goo.gl/yfRhxLkPa9jcTU9w5?g_st=ic" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-block' }}>
                    Get Directions
                  </a>
                </div>
                <div className="map-container" style={{ width: '100%', height: '100%', minHeight: '200px', backgroundColor: 'var(--sand-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <iframe 
                    title="The Boujee Barn Boutique Location Map"
                    src="https://maps.google.com/maps?q=The%20Boujee%20Barn%20Boutique,%2052%20N%20Central%20Park,%20Jacksonville,%20IL%2062650&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: '200px', display: 'block' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
            </div>

            <div className="opening-times-section" style={{ borderTop: '1px solid var(--sand-bg)', paddingTop: '2rem', marginTop: '2rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Opening Times</h4>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Sunday</span><span style={{ fontWeight: '600' }}>Closed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Monday</span><span style={{ fontWeight: '600' }}>Closed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Tuesday</span><span>10:00 AM - 5:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Wednesday</span><span>10:00 AM - 5:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Thursday</span><span>10:00 AM - 5:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>Friday</span><span>10:00 AM - 5:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Saturday</span><span>10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery */}
          <div className="contact-image-wrapper">
            <img src="/contact.jpg" alt="Contact The Boujee Barn" className="img-placeholder tall" style={{ objectFit: 'cover', border: 'none', backgroundColor: 'transparent', width: '100%', borderRadius: '4px' }} />
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
