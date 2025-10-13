'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import { EditableText } from './EditableText';
import { footerService, FooterData, FooterSection, ContactInfo, SocialMedia, LegalLink } from '../services/footerService';

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Default footer data
  const defaultFooterData: FooterData = {
    companyName: 'Elluminate Capital',
    companyDescription: 'Professional investment banking services with a focus on delivering exceptional value to our clients through strategic advisory and comprehensive financial solutions.',
    contact: {
      email: 'info@elluminatecapital.com',
      phone: '+1 (555) 123-4567',
      address: '123 Financial District, New York, NY 10004'
    },
    sections: [
      {
        title: 'Services',
        links: [
          { text: 'Investment Advisory', url: '/services#advisory' },
          { text: 'Capital Markets', url: '/services#capital' },
          { text: 'M&A Advisory', url: '/services#ma' },
          { text: 'Wealth Management', url: '/services#wealth' },
        ],
      },
      {
        title: 'Company',
        links: [
          { text: 'About Us', url: '/about' },
          { text: 'Our Team', url: '/about#team' },
          { text: 'Careers', url: '/careers' },
          { text: 'News & Insights', url: '/insights' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { text: 'Market Reports', url: '/insights#reports' },
          { text: 'Research', url: '/insights#research' },
          { text: 'Client Portal', url: '/portal' },
          { text: 'Contact Us', url: '/contact' },
        ],
      },
    ],
    socialMedia: [
      { platform: 'LinkedIn', url: '#', icon: 'Linkedin' },
      { platform: 'Twitter', url: '#', icon: 'Twitter' },
      { platform: 'Facebook', url: '#', icon: 'Facebook' },
    ],
    backToTopText: 'Back to Top',
    copyrightText: `© ${currentYear} Elluminate Capital. All rights reserved.`,
    legalLinks: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Terms of Service', url: '/terms' },
    ],
  };

  // Load footer data on component mount
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await footerService.getFooter();
        if (response.success && response.data) {
          setFooterData(response.data);
        } else {
          // Use default data if no footer data exists
          setFooterData(defaultFooterData);
        }
      } catch (err) {
        console.error('Error loading footer data:', err);
        setError('Failed to load footer data');
        setFooterData(defaultFooterData);
      } finally {
        setLoading(false);
      }
    };

    loadFooterData();
  }, []);

  // Handle updating footer data
  const handleUpdateFooter = async (field: keyof FooterData, value: any) => {
    try {
      const response = await footerService.updateFooterField(field, value);
      if (response.success && response.data) {
        setFooterData(response.data);
      }
    } catch (err) {
      console.error('Error updating footer:', err);
      setError('Failed to update footer');
    }
  };

  // Handle updating contact info
  const handleUpdateContact = async (contactField: keyof ContactInfo, value: string) => {
    if (!footerData) return;
    
    try {
      const updatedContact = { ...footerData.contact, [contactField]: value };
      const response = await footerService.updateContactInfo(updatedContact);
      if (response.success && response.data) {
        setFooterData(response.data);
      }
    } catch (err) {
      console.error('Error updating contact info:', err);
      setError('Failed to update contact info');
    }
  };

  // Handle updating section
  const handleUpdateSection = async (sectionIndex: number, field: keyof FooterSection, value: any) => {
    if (!footerData) return;
    
    try {
      const updatedSections = [...footerData.sections];
      updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [field]: value };
      const response = await footerService.createOrUpdateFooter({ sections: updatedSections });
      if (response.success && response.data) {
        setFooterData(response.data);
      }
    } catch (err) {
      console.error('Error updating section:', err);
      setError('Failed to update section');
    }
  };

  // Handle updating social media
  const handleUpdateSocialMedia = async (socialIndex: number, field: keyof SocialMedia, value: string) => {
    if (!footerData) return;
    
    try {
      const updatedSocial = [...footerData.socialMedia];
      updatedSocial[socialIndex] = { ...updatedSocial[socialIndex], [field]: value };
      const response = await footerService.updateSocialMedia(updatedSocial);
      if (response.success && response.data) {
        setFooterData(response.data);
      }
    } catch (err) {
      console.error('Error updating social media:', err);
      setError('Failed to update social media');
    }
  };

  // Handle updating legal links
  const handleUpdateLegalLink = async (linkIndex: number, field: keyof LegalLink, value: string) => {
    if (!footerData) return;
    
    try {
      const updatedLegal = [...footerData.legalLinks];
      updatedLegal[linkIndex] = { ...updatedLegal[linkIndex], [field]: value };
      const response = await footerService.updateLegalLinks(updatedLegal);
      if (response.success && response.data) {
        setFooterData(response.data);
      }
    } catch (err) {
      console.error('Error updating legal link:', err);
      setError('Failed to update legal link');
    }
  };

  if (loading) {
    return (
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)', marginTop: 'var(--space-20)' }}>
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading footer...
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return (
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)', marginTop: 'var(--space-20)' }}>
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--text-error)' }}>
          {error || 'Failed to load footer data'}
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        marginTop: 'var(--space-20)',
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6) var(--space-8)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Company Info */}
          <div>
            <EditableText
              value={footerData.companyName}
              onSave={(newValue) => handleUpdateFooter('companyName', newValue)}
              tag="h3"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
              }}
            />
            <EditableText
              value={footerData.companyDescription}
              onSave={(newValue) => handleUpdateFooter('companyDescription', newValue)}
              tag="p"
              multiline
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: 'var(--space-6)',
              }}
            />
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Mail size={16} color="var(--text-accent)" />
                <EditableText
                  value={footerData.contact.email}
                  onSave={(newValue) => handleUpdateContact('email', newValue)}
                  style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Phone size={16} color="var(--text-accent)" />
                <EditableText
                  value={footerData.contact.phone}
                  onSave={(newValue) => handleUpdateContact('phone', newValue)}
                  style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <MapPin size={16} color="var(--text-accent)" />
                <EditableText
                  value={footerData.contact.address}
                  onSave={(newValue) => handleUpdateContact('address', newValue)}
                  style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}
                />
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerData.sections.map((section, sectionIndex) => (
            <div key={section.title}>
              <EditableText
                value={section.title}
                onSave={(newValue) => handleUpdateSection(sectionIndex, 'title', newValue)}
                tag="h4"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                      <EditableText
                        value={link.text}
                        onSave={(newValue) => {
                          const updatedLinks = [...section.links];
                          updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], text: newValue };
                          handleUpdateSection(sectionIndex, 'links', updatedLinks);
                        }}
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: 'var(--text-sm)',
                        }}
                      />
                      {link.url && (
                        <EditableText
                          value={link.url}
                          onSave={(newValue) => {
                            const updatedLinks = [...section.links];
                            updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], url: newValue };
                            handleUpdateSection(sectionIndex, 'links', updatedLinks);
                          }}
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: 'var(--text-xs)',
                            fontStyle: 'italic',
                          }}
                          placeholder="URL"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--border-primary)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {footerData.socialMedia.map((social, socialIndex) => {
              const getIconComponent = (iconName: string) => {
                switch (iconName) {
                  case 'Linkedin': return Linkedin;
                  case 'Twitter': return Twitter;
                  case 'Facebook': return Facebook;
                  default: return Linkedin;
                }
              };
              const IconComponent = getIconComponent(social.icon || 'Linkedin');
              return (
                <div key={socialIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <a
                    href={social.url}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-accent)';
                      e.currentTarget.style.color = 'var(--text-inverse)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-primary)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label={social.platform}
                  >
                    <IconComponent size={20} />
                  </a>
                  <EditableText
                    value={social.platform}
                    onSave={(newValue) => handleUpdateSocialMedia(socialIndex, 'platform', newValue)}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-xs)',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--color-accent)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-dark)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <EditableText
              value={footerData.backToTopText}
              onSave={(newValue) => handleUpdateFooter('backToTopText', newValue)}
              style={{
                color: 'var(--text-inverse)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            />
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: 'var(--bg-tertiary)',
          borderTop: '1px solid var(--border-primary)',
          padding: 'var(--space-4) var(--space-6)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <EditableText
            value={footerData.copyrightText}
            onSave={(newValue) => handleUpdateFooter('copyrightText', newValue)}
            tag="p"
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
              margin: 0,
            }}
          />
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            {footerData.legalLinks.map((link, linkIndex) => (
              <div key={linkIndex} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <Link
                  href={link.url || '#'}
                  style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <EditableText
                    value={link.text}
                    onSave={(newValue) => handleUpdateLegalLink(linkIndex, 'text', newValue)}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-sm)',
                    }}
                  />
                </Link>
                <EditableText
                  value={link.url || ''}
                  onSave={(newValue) => handleUpdateLegalLink(linkIndex, 'url', newValue)}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--text-xs)',
                    fontStyle: 'italic',
                  }}
                  placeholder="URL"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Error boundary wrapper
const FooterWithErrorBoundary: React.FC = () => {
  try {
    return <Footer />;
  } catch (error) {
    console.error('Footer component error:', error);
    return (
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)', marginTop: 'var(--space-20)' }}>
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--text-error)' }}>
          Footer temporarily unavailable. Please refresh the page.
        </div>
      </footer>
    );
  }
};

export default FooterWithErrorBoundary;
