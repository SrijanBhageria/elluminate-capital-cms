'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.2; // Hero section height
      const videoStart = heroHeight;
      
      setIsScrolled(scrollY > 20);
      setIsOverVideo(scrollY > videoStart);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOverVideo ? 'over-video' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-fixed)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
        }}
        className="navbar-container"
      >
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              setIsLogoHovered(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              setIsLogoHovered(false);
            }}
          >
            <Image 
              src="/usethis.png" 
              alt="Elluminate Capital" 
              width={200} 
              height={60}
              style={{ 
                objectFit: 'contain',
                height: 'auto',
                maxHeight: '50px'
              }}
              priority
            />
          </Link>
        </div>


        {/* Middle Section - CMS Header */}
        <div className="navbar-middle">
          <h1 
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CMS
          </h1>
        </div>

        {/* Right Section - Empty for now */}
        <div className="navbar-right">
        </div>
      </div>


      <style jsx>{`
        .navbar {
          background: transparent;
          border: none;
        }
        
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          border: none;
          box-shadow: var(--shadow-luxury);
        }
        
        /* Over video section - always visible */
        .navbar.over-video {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-luxury);
        }
        
        .navbar.over-video .navbar-container {
          color: var(--text-primary);
        }
        
        .navbar.over-video .navbar-container span {
          color: var(--text-primary) !important;
        }
        
        .navbar-container {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
        }
        
        .navbar-left {
          flex: 0 0 auto;
        }
        
        .navbar-middle {
          flex: 1;
          display: flex;
          justify-content: right;
          align-items: center;
        }
        
        .navbar-right {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }
        
        
      `}</style>
    </nav>
  );
};

export default Navbar;
