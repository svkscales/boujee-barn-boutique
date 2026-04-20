import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import TrustBanner from './components/TrustBanner';
import Categories from './components/Categories';
import VibeSection from './components/VibeSection';
import NewsAndUpdates from './components/NewsAndUpdates';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsOfService from './components/TermsOfService';
import ReturnPolicy from './components/ReturnPolicy';
import ShippingPolicy from './components/ShippingPolicy';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

const Home = () => (
  <>
    <HeroAnimation />
    <TrustBanner />
    <Categories />
    <VibeSection />
    <NewsAndUpdates />
  </>
);

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#');
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo(0, 0); // Ensure the new page loads at the top
    };
    window.addEventListener('hashchange', handleHashChange);
    
    const handleScroll = () => {
      // Toggle badge visibility after scrolling roughly past the hero screen
      setIsScrolledPastHero(window.scrollY > (window.innerHeight * 0.8));
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderContent = () => {
    if (currentRoute === '#about') return <AboutPage />;
    if (currentRoute === '#contact') return <ContactPage />;
    if (currentRoute === '#terms') return <TermsOfService />;
    if (currentRoute === '#returns') return <ReturnPolicy />;
    if (currentRoute === '#shipping') return <ShippingPolicy />;
    
    if (currentRoute.startsWith('#product-')) {
      const handle = currentRoute.replace('#product-', '');
      return <ProductPage handle={handle} />;
    }

    const categories = ['#tops', '#bottoms', '#dresses', '#dancewear', '#accessories', '#childrens', '#toys'];
    if (categories.includes(currentRoute)) {
      const displayTitle = currentRoute.replace('#', '');
      return <ProductGrid type="category" value={currentRoute.replace('#', '')} title={displayTitle} />;
    }

    if (currentRoute === '#sale' || currentRoute === '#new-arrivals') {
      const queryMap = { '#sale': 'is_price_reduced:true', '#new-arrivals': 'tag:*new*' };
      return <ProductGrid type="custom-query" value={queryMap[currentRoute]} title={currentRoute.replace('#', '').replace('-', ' ')} />;
    }

    const taxonomy = {
      '#jackets': { type: 'Tops', collection: 'jackets' },
      '#short-sleeve': { type: 'Tops', collection: 'short-sleeve' },
      '#long-sleeve': { type: 'Tops', collection: 'long-sleeve' },
      '#graphic-tees': { type: 'Tops', collection: 'graphic-tees' },
      '#tanks': { type: 'Tops', collection: 'tanks' },
      '#sweatshirts': { type: 'Tops', collection: 'sweatshirts' },
      
      '#jeans': { type: 'Bottoms', collection: 'bottoms-jeans', display: 'Jeans' },
      '#pants': { type: 'Bottoms', collection: 'pants' },
      '#overalls': { type: 'Bottoms', collection: 'overalls' },
      '#sweatpants': { type: 'Bottoms', collection: 'sweatpants' },
      '#skirts': { type: 'Bottoms', collection: 'skirts' },
      '#shorts': { type: 'Bottoms', collection: 'shorts' },

      '#mini': { type: 'Dresses', collection: 'mini' },
      '#midi': { type: 'Dresses', collection: 'midi' },
      '#maxi': { type: 'Dresses', collection: 'maxi' },

      '#leotards': { type: 'Dancewear', collection: 'leotards' },
      '#tops-dance': { type: 'Dancewear', collection: 'tops' },
      '#bottoms-dance': { type: 'Dancewear', collection: 'bottoms' },
      '#sets': { type: 'Dancewear', collection: 'sets' },
      '#warmups': { type: 'Dancewear', collection: 'warmups' },
      '#dance-accessories': { type: 'Dancewear', collection: 'accessories' },
      '#dance-shoes': { type: 'Dancewear', collection: 'shoes' },

      '#jewelry': { type: 'Accessories', collection: 'jewelry' },
      '#fragrance': { type: 'Accessories', collection: 'fragrance' },
      '#candles': { type: 'Accessories', collection: 'candles' },
      '#hats': { type: 'Accessories', collection: 'hats' },
      '#handbags': { type: 'Accessories', collection: 'handbags' },
      '#clutches': { type: 'Accessories', collection: 'clutches' },
      '#shoes': { type: 'Accessories', collection: 'shoes' },

      '#childrens-jackets': { type: 'Childrens', collection: 'jackets' },
      '#childrens-tops': { type: 'Childrens', collection: 'tops' },
      '#childrens-jeans': { type: 'Childrens', collection: 'bottoms-jeans', display: 'Jeans' },
      '#childrens-pants': { type: 'Childrens', collection: 'pants' },
      '#childrens-shorts': { type: 'Childrens', collection: 'shorts' },
      '#childrens-skirts': { type: 'Childrens', collection: 'skirts' },
      '#childrens-dresses': { type: 'Childrens', collection: 'dresses' },
      '#childrens-accessories': { type: 'Childrens', collection: 'accessories' },

      '#plush-toys': { type: 'Toys', collection: 'plush-toys' },
      '#games': { type: 'Toys', collection: 'games' },
      '#educational-toys': { type: 'Toys', collection: 'educational-toys' },
      '#sensory-toys': { type: 'Toys', collection: 'sensory-toys' },
      '#seasonal-novelty': { type: 'Toys', collection: 'seasonal-novelty' }
    };

    if (currentRoute.startsWith('#search=')) {
      const searchTermRaw = currentRoute.replace('#search=', '');
      const searchTerm = decodeURIComponent(searchTermRaw).replace(/-/g, ' ');
      return <ProductGrid type="search" value={searchTerm} title={`Search Results: ${searchTerm}`} />;
    }

    if (taxonomy[currentRoute]) {
      const { type: pType, collection: collHandle, display } = taxonomy[currentRoute];
      const title = display || collHandle.replace('-', ' ');
      return <ProductGrid type="collection" value={collHandle} productType={pType} title={title} />;
    }

    const ignoreList = ['', '#', '#navbar', '#hero', '#contact', '#about', '#returns', '#shipping', '#terms'];
    if (ignoreList.includes(currentRoute)) {
      return <Home />;
    }

    // Fallback if not an ignore path and not a known product path
    return <ProductGrid type="collection" value={currentRoute.replace('#', '')} />;
  };

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      
      {/* Route Switcher */}
      {renderContent()}
      
      <Footer />
      
      {/* Floating Brand Seal */}
      <div className={`floating-brand-badge ${isScrolledPastHero ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/logo.png" alt="Boujee Barn Certified Seal" />
      </div>
      
      <SmoothCursor />
    </CartProvider>
  );
}

export default App;
