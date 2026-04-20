import React from 'react';

const Categories = () => {
  return (
    <section className="categories-section" id="new-arrivals" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header">
          <h2>The Boutique</h2>
          <p>Discover our latest arrivals tailored for the modern cowgirl.</p>
        </div>
        
        <div className="grid-3" style={{ gap: '1.5rem' }}>
          <div className="category-card" style={{ display: 'block', textDecoration: 'none', textAlign: 'left' }}>
            <div className="img-placeholder" style={{ 
              backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0741/7400/5402/files/1320964a16f55ecccca5ef0ce1073c2ab8924d1a4deb9dd64a1a3f115d7e808d.jpg?v=1775177314)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              aspectRatio: '2/3',
              height: 'auto',
              marginBottom: '1rem',
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              overflow: 'hidden'
            }}></div>
            <div style={{ padding: '0 0.5rem' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Boutique Bottoms</h3>
              <a href="#bottoms" className="link-arrow" style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 600 }}>Shop Bottoms &rarr;</a>
            </div>
          </div>
          <div className="category-card" style={{ display: 'block', textDecoration: 'none', textAlign: 'left' }}>
            <div className="img-placeholder" style={{ 
              backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0741/7400/5402/files/23a5dc70d234be04fcfa802faed14e2f94c457bdfabfe4f4d8660e6996e0174d.jpg?v=1775177408)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'top center',
              aspectRatio: '2/3',
              height: 'auto',
              marginBottom: '1rem',
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              overflow: 'hidden'
            }}></div>
            <div style={{ padding: '0 0.5rem' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Graphic Tees</h3>
              <a href="#tops" className="link-arrow" style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 600 }}>Shop Tops &rarr;</a>
            </div>
          </div>
          <div className="category-card" style={{ display: 'block', textDecoration: 'none', textAlign: 'left' }}>
            <div className="img-placeholder" style={{ 
              backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0741/7400/5402/files/4675c8cf8fe4b5e4c96b56275563b9a92b85c6ff07a25534e4352290b5cde837.jpg?v=1775177307)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              aspectRatio: '2/3',
              height: 'auto',
              marginBottom: '1rem',
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              overflow: 'hidden'
            }}></div>
            <div style={{ padding: '0 0.5rem' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Western Accessories</h3>
              <a href="#accessories" className="link-arrow" style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 600 }}>Complete The Look &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
