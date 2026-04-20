import React, { useEffect, useRef } from 'react';

const HeroAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const frameCount = 192; // 000 to 191
    let currentIndex = 0;
    
    // Define render first
    const render = (frameIndex) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      const xOffset = (canvas.width - newWidth) / 2;
      const yOffset = (canvas.height - newHeight) / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, xOffset, yOffset, newWidth, newHeight);
    };

    // Define updateCanvasOnScroll second
    const updateCanvasOnScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = container.scrollHeight - window.innerHeight;
      
      let scrollFraction = scrollTop / maxScroll;
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;
      
      const frameIndex = Math.floor(scrollFraction * (frameCount - 1));
      
      if (frameIndex !== currentIndex) {
        currentIndex = frameIndex;
        requestAnimationFrame(() => render(frameIndex));
      }
    };

    // Define setCanvasSize third
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (imagesRef.current.length > 0) {
        updateCanvasOnScroll();
      }
    };
    
    // NOW start execution
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("scroll", updateCanvasOnScroll);

    let loadedImages = 0;
    const currentFrame = (index) => `/cow_images/frame_${index.toString().padStart(3, '0')}_delay-0.041s.jpg`;

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
      
      img.onload = () => {
        loadedImages++;
        
        // Only trigger the initial frame load once the physical FIRST image actually finishes downloading over the live network.
        if (i === 0) {
          setCanvasSize();
          render(0);
        }
      };
    }

    return () => {
      window.removeEventListener("scroll", updateCanvasOnScroll);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <section className="hero-scroll-container" id="hero" ref={containerRef}>
      <div className="canvas-wrapper">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Be Bold.<br />Be Beautiful.<br /><em>Be Boujee.</em></h1>
          <p className="hero-subtitle">Curated Western Boho Elegance</p>
          <div className="hero-ctas">
            <a href="#new-arrivals" className="btn btn-primary">New Arrivals</a>
            <a href="#sale" className="btn btn-transparent">Shop On Sale</a>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"></div>
          <p>Scroll to Explore</p>
        </div>
      </div>
    </section>
  );
};

export default HeroAnimation;
