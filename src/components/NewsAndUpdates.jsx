import React from 'react';

const NewsAndUpdates = () => {
  return (
    <>
      <section className="news-updates-section" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header line-header text-center" style={{ justifyContent: 'center', marginBottom: '3rem', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Barn Updates</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Catch up on all the latest boutique buzz, behind-the-scenes moments, and fresh drops directly from the floor.
            </p>
          </div>

          <div className="facebook-feed-container" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Ffacebook.com%2FShopBoujeeBarn&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
              width="500" 
              height="700" 
              style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }} 
              scrolling="no" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
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

export default NewsAndUpdates;
