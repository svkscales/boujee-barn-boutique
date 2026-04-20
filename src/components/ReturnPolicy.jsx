import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="policy-page" style={{ backgroundColor: 'var(--bg-color)', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header line-header text-center" style={{ justifyContent: 'center', marginBottom: '4rem', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Return & Refund Policy</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The Boujee Barn Boutique LLC<br />Last updated: April 14, 2026</p>
        </div>

        <div className="policy-content" style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
          <p style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
            Thank you for shopping with The Boujee Barn Boutique. If you are not completely satisfied with your purchase, we’re here to help.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Returns</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            All returns must be postmarked within seven (7) days of the purchase date. To be eligible for a return, items must be in new and unused condition with all original tags and labels attached.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Return Process</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            To return an item, place it securely in its original packaging with all tags intact and mail it to the following address:
          </p>
          <div style={{ backgroundColor: 'var(--sand-bg)', padding: '1.5rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
            <p style={{ margin: 0, fontWeight: '500' }}>The Boujee Barn Boutique</p>
            <p style={{ margin: 0 }}>Attn: Returns</p>
            <p style={{ margin: 0 }}>52 North Central Park Plaza</p>
            <p style={{ margin: 0 }}>Jacksonville, IL 62650</p>
            <p style={{ margin: 0 }}>United States</p>
          </div>
          <p style={{ marginBottom: '1.5rem' }}>
            Please note that you are responsible for all return shipping charges. We strongly recommend using a trackable shipping method.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Refunds</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Once we receive your return and inspect the condition of the item, we will process your refund or exchange within three (3) business days. You will be notified once your return has been processed.
          </p>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Exceptions</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            The following items are not eligible for return or exchange: <strong>Clearance items</strong>. If you receive a defective or damaged item, please contact us immediately using the details below and we will arrange a refund or exchange.
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

export default ReturnPolicy;
