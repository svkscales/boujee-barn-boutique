import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const VibeSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const p1Full = "Born in Jacksonville, Illinois, The Boujee Barn is more than a boutique; it is a celebration of the fierce independent spirit wrapped in modern bohemian luxury.";
  const p2Full = "We source high-quality, free-spirited pieces designed to make you feel bold, beautiful, and unapologetically boujee wherever you go.";

  const [p1Len, setP1Len] = useState(0);
  const [p2Len, setP2Len] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current1 = 0;
    let current2 = 0;

    const intervalId = setInterval(() => {
      let updated = false;

      // Type out p1 first
      if (current1 < p1Full.length) {
        current1 += 2; // Type faster by leaping 2 chars
        setP1Len(Math.min(current1, p1Full.length));
        updated = true;
      } 
      // Once p1 is done, type out p2
      else if (current2 < p2Full.length) {
        current2 += 2;
        setP2Len(Math.min(current2, p2Full.length));
        updated = true;
      }

      if (!updated) {
        clearInterval(intervalId);
      }
    }, 15); // 15ms per tick = ~2 seconds total for 250+ chars

    return () => clearInterval(intervalId);
  }, [isInView]);

  return (
    <div ref={containerRef} style={{ height: '140vh', position: 'relative', width: '100%', backgroundColor: 'var(--bg-color)' }}>
      <section className="vibe-section" style={{ position: 'sticky', top: '80px', height: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0, overflow: 'hidden' }}>
        <div className="slash-banner"></div>
        <div className="container vibe-grid" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="vibe-image">
            <img src="/owner.jpg" alt="Boujee Barn Owners" className="img-placeholder tall" style={{ objectFit: 'cover', border: 'none', backgroundColor: 'transparent' }} />
          </div>
          <div className="vibe-content">
            <h2>Effortless <em>Feminine</em> Charm</h2>
            
            <div className="vibe-text-container">
              {/* Desktop Typewriter (Hidden on Mobile) */}
              <p className="desktop-typing" style={{ position: 'relative' }}>
                <span style={{ color: 'transparent', userSelect: 'none' }}>{p1Full}</span>
                <span style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                  {p1Full.slice(0, p1Len)}
                </span>
              </p>
              
              <p className="desktop-typing" style={{ position: 'relative', marginTop: '1rem' }}>
                <span style={{ color: 'transparent', userSelect: 'none' }}>{p2Full}</span>
                <span style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
                  {p2Full.slice(0, p2Len)}
                </span>
              </p>

              {/* Mobile Static Fade (Hidden on Desktop) */}
              <p className="mobile-static">
                <span style={{ display: 'block', animation: 'fadeInUp 1s ease 0s forwards', opacity: 0 }}>Born in Jacksonville, Illinois, The Boujee Barn is more than a boutique;</span>
                <span style={{ display: 'block', animation: 'fadeInUp 1s ease 0.3s forwards', opacity: 0 }}>it is a celebration of the fierce independent spirit wrapped in modern bohemian luxury.</span>
              </p>
              <p className="mobile-static" style={{ marginTop: '1rem' }}>
                <span style={{ display: 'block', animation: 'fadeInUp 1s ease 0.6s forwards', opacity: 0 }}>We source high-quality, free-spirited pieces designed to make you feel bold, beautiful,</span>
                <span style={{ display: 'block', animation: 'fadeInUp 1s ease 0.9s forwards', opacity: 0 }}>and unapologetically boujee wherever you go.</span>
              </p>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <a href="#about" className="btn btn-outline">Read Our Story</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VibeSection;
