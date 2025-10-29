'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const offices = [
    {
      city: 'New York',
      address: '123 Financial District, New York, NY 10004',
      phone: '+1 (555) 123-4567',
      email: 'ny@elluminatecapital.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST'
    },
    {
      city: 'London',
      address: '45 Canary Wharf, London E14 5AB, UK',
      phone: '+44 20 7123 4567',
      email: 'london@elluminatecapital.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM GMT'
    },
    {
      city: 'Hong Kong',
      address: '88 Central Plaza, Central, Hong Kong',
      phone: '+852 2123 4567',
      email: 'hk@elluminatecapital.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM HKT'
    }
  ];

  const services = [
    'Investment Advisory',
    'Capital Markets',
    'M&A Advisory',
    'Wealth Management',
    'General Inquiry'
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--gradient-subtle)',
          padding: 'var(--space-20) var(--space-6)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
            }}
          >
            Ready to discuss your financial goals? Get in touch with our team 
            of experts for personalized advisory services.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: 'var(--space-12)',
            }}
          >
            {/* Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div
                  style={{
                    padding: 'var(--space-8)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-accent)',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle size={60} color="var(--color-accent)" style={{ marginBottom: 'var(--space-4)' }} />
                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Thank you for your inquiry. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: 'var(--space-8)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: 'var(--text-primary)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: 'var(--text-primary)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: 'var(--text-primary)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          color: 'var(--text-primary)',
                          fontWeight: 'var(--font-weight-medium)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: 'var(--text-base)',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <label
                      style={{
                        display: 'block',
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-base)',
                      }}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <label
                      style={{
                        display: 'block',
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: 'var(--space-3)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-base)',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: 'var(--space-4)',
                      background: 'var(--color-accent)',
                      color: 'var(--text-inverse)',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)',
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
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                Get in Touch
              </h2>

              <div style={{ marginBottom: 'var(--space-8)' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--gradient-accent)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Mail size={24} color="var(--text-primary)" />
                  </div>
                  <div>
                    <h3
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Email Us
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      info@elluminatecapital.com
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--gradient-accent)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone size={24} color="var(--text-primary)" />
                  </div>
                  <div>
                    <h3
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Call Us
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--gradient-accent)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={24} color="var(--text-primary)" />
                  </div>
                  <div>
                    <h3
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Business Hours
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      Mon-Fri: 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Office Locations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {offices.map((office, index) => (
                  <div
                    key={index}
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <h4
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {office.city}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <MapPin size={16} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        {office.address}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <Phone size={16} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        {office.phone}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <Mail size={16} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        {office.email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <Clock size={16} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        {office.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
