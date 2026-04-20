import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="policy-page" style={{ backgroundColor: 'var(--bg-color)', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header line-header text-center" style={{ justifyContent: 'center', marginBottom: '4rem', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Shipping Policy</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The Boujee Barn Boutique LLC<br />Last updated: April 17, 2026</p>
        </div>

        <div className="policy-content" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
          <p style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
            This Shipping Policy is part of our Terms of Service and should be read alongside them at <a href="#terms" style={{ textDecoration: 'underline' }}>theboujeebarnboutique.com/terms</a>.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shipping Options</h3>
          
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', marginTop: '1.5rem' }}>In-Store Pickup</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            In-store pickup is available for all products. Pickups are available Tuesday through Saturday, 10am to 5pm, at 52 North Central Park Plaza, Jacksonville, IL 62650.
          </p>

          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', marginTop: '1.5rem' }}>Free Shipping</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            Orders of $150 or more qualify for free shipping within the United States.
          </p>

          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', marginTop: '1.5rem' }}>Shipping Fees</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            For orders under $150, we ship via USPS with a flat shipping fee of $8.00. Estimated delivery is 3 to 7 business days. All delivery times and dates are estimates only and are provided in good faith.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>International Shipping</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            We do not currently offer international shipping. We ship within the United States only.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions About Returns</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            For information about returns and refunds, please review our Return Policy at <a href="#returns" style={{ textDecoration: 'underline' }}>theboujeebarnboutique.com/returns</a>.
          </p>

          <div className="contact-block" style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--white)', borderTop: '4px solid var(--accent-light)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Us</h3>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>The Boujee Barn Boutique LLC</p>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>52 North Central Park Plaza, Jacksonville, IL 62650</p>
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}><a href="mailto:jcworth85@boujeebarnboutique.net" style={{ color: 'inherit', textDecoration: 'underline' }}>jcworth85@boujeebarnboutique.net</a></p>
            <p style={{ marginBottom: '0', color: 'var(--text-secondary)' }}><a href="tel:+12173706800" style={{ color: 'inherit', textDecoration: 'none' }}>217-370-6800</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
