import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* The Owner Section */}
      <section className="about-hero vibe-section">
        <div className="container vibe-grid">
          <div className="vibe-image">
            <img src="/owner-solo.jpg" alt="Boujee Barn Owner" className="img-placeholder tall" style={{ objectFit: 'cover', border: 'none', backgroundColor: 'transparent' }} />
          </div>
          <div className="vibe-content">
            <h2>The <em>Vision</em> Behind The Barn</h2>
            <p>Raised in Franklin on the sprawling Evergreen Farms, our founder developed a deep-rooted connection to western aesthetics that inspired a lifelong dream: creating a boutique that authentically blends rustic heritage with premium fashion.</p>
            <p>After putting years of dedication into the retail industry, she finally brought The Boujee Barn to life. Creating her own store was the ultimate passion project—a carefully curated destination for bold, independent style.</p>
            <p>Taking immense pride in every detail of the brand, she personally hand-picks each item that steps foot in the storefront. She even goes a step further to hand-customize signature pieces, adding her own distinct creative twist to the collection.</p>
          </div>
        </div>
      </section>

      {/* Meet The Staff Section */}
      <section className="meet-staff" style={{ backgroundColor: 'var(--white)', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header line-header text-center" style={{ justifyContent: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem' }}>Meet The Girls</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>The faces behind the desk keeping the boutique running flawlessly.</p>
          </div>

          <div className="grid-4">
            <div className="staff-card">
              <div className="img-placeholder" style={{ height: '400px', backgroundColor: 'var(--sand-bg)', overflow: 'hidden' }}>
                <img src="/staff-bobbie.jpg" alt="Bobbie Joe" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.35)', transformOrigin: 'center 15%' }} />
              </div>
              <div className="staff-info" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Bobbie Joe</h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>Store Manager</p>
              </div>
            </div>
            
            <div className="staff-card">
              <div className="img-placeholder" style={{ height: '400px', backgroundColor: 'var(--sand-bg)', overflow: 'hidden' }}>
                <img src="/staff-kylie.jpg" alt="Kylie Chumley" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
              </div>
              <div className="staff-info" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Kylie Chumley</h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>Sales Associate</p>
              </div>
            </div>

            <div className="staff-card">
              <div className="img-placeholder" style={{ height: '400px', backgroundColor: 'var(--sand-bg)', overflow: 'hidden' }}>
                <img src="/staff-ella.jpg" alt="Ella Chumley" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
              </div>
              <div className="staff-info" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Ella Chumley</h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>Sales Associate</p>
              </div>
            </div>

            <div className="staff-card">
              <div className="img-placeholder" style={{ height: '400px', backgroundColor: 'var(--sand-bg)', overflow: 'hidden' }}>
                <img src="/staff-abby.jpg" alt="Abby Wood" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
              </div>
              <div className="staff-info" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Abby Wood</h4>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>Sales Associate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gallery Section */}
      <section className="boutique-gallery" style={{ backgroundColor: 'transparent', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header line-header text-center" style={{ justifyContent: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem' }}>Inside The Barn</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Take a look inside our flagship Jacksonville storefront.</p>
          </div>

          <div className="boutique-masonry" style={{ columnCount: 3, columnGap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="gallery-item" style={{ breakInside: 'avoid', marginBottom: '2rem', backgroundColor: 'var(--sand-bg)', overflow: 'hidden' }}>
                <img src={`/barn${num}.jpg`} alt={`Boujee Barn Interior ${num}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
