'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Award, ArrowRight, BarChart3, Globe, DollarSign, Building2, Shield, Target, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import Link from 'next/link';
import { EditableText, EditableTextRef } from '../components/EditableText';
import { EditableNumbers } from '../components/EditableNumbers';
import { cmsService, PageContentData } from '../services/cmsService';
import { PageType } from '../constants/pageTypes';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ clients: 0, deals: 0, years: 0, assets: 0 });
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const btnText1Ref = useRef<EditableTextRef>(null);
  const btnText2Ref = useRef<EditableTextRef>(null);
  const btnTextEndingRef = useRef<EditableTextRef>(null);
  
  // CMS State
  const [cmsData, setCmsData] = useState<PageContentData | null>(null);
  const [visionData, setVisionData] = useState<PageContentData | null>(null);
  const [storyData, setStoryData] = useState<PageContentData | null>(null);
  const [leadershipData, setLeadershipData] = useState<PageContentData | null>(null);
  const [investmentStrategyData, setInvestmentStrategyData] = useState<PageContentData | null>(null);
  const [partnersData, setPartnersData] = useState<PageContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);
  
  const clients: string[] = [
    'Aurum Partners',
    'Nexus Holdings',
    'Vertex Group',
    'Summit Equity',
    'Crescent Global',
    'Atlas Financial',
    'Pinnacle Ventures',
    'Monarch Capital',
    'Sterling Trust',
    'Horizon Investments',
  ];
  const clientProfiles: { name: string; company: string; image: string }[] = [
    {
      name: 'Amit Kumar',
      company: 'CarDeck',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Prashant Tandon',
      company: 'OneMed',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Aloke Bajpai',
      company: 'TravelX',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Swapandeep Mann',
      company: 'NutriLabs',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Sarah Mitchell',
      company: 'ZenPay',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'David Chen',
      company: 'NovaGrid',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Emily Rodriguez',
      company: 'CapMark',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1100&fit=crop&crop=faces',
    },
    {
      name: 'Michael Thompson',
      company: 'Meridian',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&h=1100&fit=crop&crop=faces',
    },
  ];

  const scrollClients = (direction: 'prev' | 'next') => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.9, 320);
    el.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Load existing content from CMS
    const loadPageContent = async () => {
      if (hasLoadedRef.current) return; // Prevent multiple calls
      hasLoadedRef.current = true;
      
      try {
        setIsLoading(true);
        
        // Load LANDING page content
        const landingResponse = await cmsService.getPageContent(PageType.LANDING);
        if (landingResponse.success && landingResponse.data) {
          setCmsData(landingResponse.data);
        } else {
          console.error('Failed to load landing page content:', landingResponse.message);
        }
        
        // Load VISION page content
        const visionResponse = await cmsService.getPageContent(PageType.VISION);
        if (visionResponse.success && visionResponse.data) {
          console.log('Vision data loaded:', visionResponse.data);
          console.log('Vision items count:', visionResponse.data.items?.length || 0);
          setVisionData(visionResponse.data);
        } else {
          console.error('Failed to load vision page content:', visionResponse.message);
        }
        
        // Load STORY page content
        const storyResponse = await cmsService.getPageContent(PageType.STORY);
        if (storyResponse.success && storyResponse.data) {
          setStoryData(storyResponse.data);
        } else {
          console.error('Failed to load story page content:', storyResponse.message);
        }
        
        // Load LEADERSHIP_TEAM page content
        const leadershipResponse = await cmsService.getPageContent(PageType.LEADERSHIP_TEAM);
        if (leadershipResponse.success && leadershipResponse.data) {
          setLeadershipData(leadershipResponse.data);
        } else {
          console.error('Failed to load leadership team page content:', leadershipResponse.message);
        }
        
        // Load INVESTMENT_STRATEGY page content
        const investmentStrategyResponse = await cmsService.getPageContent(PageType.INVESTMENT_STRATEGY);
        if (investmentStrategyResponse.success && investmentStrategyResponse.data) {
          setInvestmentStrategyData(investmentStrategyResponse.data);
        } else {
          console.error('Failed to load investment strategy page content:', investmentStrategyResponse.message);
        }
        
        // Load PARTNERS page content
        const partnersResponse = await cmsService.getPageContent(PageType.PARTNERS);
        if (partnersResponse.success && partnersResponse.data) {
          setPartnersData(partnersResponse.data);
        } else {
          console.error('Failed to load partners page content:', partnersResponse.message);
        }
      } catch (error) {
        console.error('Error loading page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
      loadPageContent();
    
    // Animate statistics
    const animateStats = () => {
      const targets = { clients: 500, deals: 1200, years: 15, assets: 50 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          clients: Math.floor(targets.clients * easeOut),
          deals: Math.floor(targets.deals * easeOut),
          years: Math.floor(targets.years * easeOut),
          assets: Math.floor(targets.assets * easeOut)
        });
        
        if (step >= steps) clearInterval(timer);
      }, stepDuration);
    };
    
    setTimeout(animateStats, 500);
  }, []);

  // CMS Functions
  const handleTitleSave = async (newTitle: string) => {
    if (!cmsData) return;
    const updatedData = { ...cmsData, title: newTitle };
    setCmsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleSubtitleSave = async (newSubtitle: string) => {
    if (!cmsData) return;
    const updatedData = { ...cmsData, subtitle: newSubtitle };
    setCmsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleNumbersSave = async (newNumbers: Array<{ value: string; label: string }>) => {
    if (!cmsData) return;
    const updatedData = { ...cmsData, numbers: newNumbers };
    setCmsData(updatedData);
    await saveToCMS(updatedData);
  };

  // VISION page handlers
  const handleVisionTitleSave = async (newTitle: string) => {
    if (!visionData) return;
    const updatedData = { ...visionData, title: newTitle };
    setVisionData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleVisionSubtitleSave = async (newSubtitle: string) => {
    if (!visionData) return;
    const updatedData = { ...visionData, subtitle: newSubtitle };
    setVisionData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleItemsSave = async (newItems: Array<{ title: string; description: string }>) => {
    if (!visionData) return;
    const updatedData = { ...visionData, items: newItems };
    setVisionData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    if (!visionData) return;
    const updatedData = { ...visionData, btnTxt: newBtnTxt };
    setVisionData(updatedData);
    await saveToCMS(updatedData);
  };

  // Story section handlers
  const handleStoryTitleSave = async (newTitle: string) => {
    if (!storyData) return;
    const updatedData = { ...storyData, title: newTitle };
    setStoryData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleStoryDescriptionSave = async (newDescription: string) => {
    if (!storyData) return;
    const updatedData = { ...storyData, subtitle: newDescription };
    setStoryData(updatedData);
    await saveToCMS(updatedData);
  };

  // Leadership team handlers
  const handleLeadershipTitleSave = async (newTitle: string) => {
    if (!leadershipData) return;
    const updatedData = { ...leadershipData, title: newTitle };
    setLeadershipData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleLeadershipSubtitleSave = async (newSubtitle: string) => {
    if (!leadershipData) return;
    const updatedData = { ...leadershipData, subtitle: newSubtitle };
    setLeadershipData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleLeadershipItemsSave = async (newItems: Array<{ title: string; description: string }>) => {
    if (!leadershipData) return;
    const updatedData = { ...leadershipData, items: newItems };
    setLeadershipData(updatedData);
    await saveToCMS(updatedData);
  };

  // Investment strategy handlers
  const handleInvestmentStrategyTitleSave = async (newTitle: string) => {
    if (!investmentStrategyData) return;
    const updatedData = { ...investmentStrategyData, title: newTitle };
    setInvestmentStrategyData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleInvestmentStrategyDescriptionSave = async (newDescription: string) => {
    if (!investmentStrategyData) return;
    const updatedData = { ...investmentStrategyData, subtitle: newDescription };
    setInvestmentStrategyData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleInvestmentStrategyNumbersSave = async (newNumbers: Array<{ value: string; label: string }>) => {
    if (!investmentStrategyData) return;
    const updatedData = { ...investmentStrategyData, numbers: newNumbers };
    setInvestmentStrategyData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleInvestmentStrategyBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    if (!investmentStrategyData) return;
    const updatedData = { ...investmentStrategyData, btnTxt: newBtnTxt };
    setInvestmentStrategyData(updatedData);
    await saveToCMS(updatedData);
  };

  // Partners handlers
  const handlePartnersTitleSave = async (newTitle: string) => {
    if (!partnersData) return;
    const updatedData = { ...partnersData, title: newTitle };
    setPartnersData(updatedData);
    await saveToCMS(updatedData);
  };

  const handlePartnersDescriptionSave = async (newDescription: string) => {
    if (!partnersData) return;
    const updatedData = { ...partnersData, subtitle: newDescription };
    setPartnersData(updatedData);
    await saveToCMS(updatedData);
  };

  const saveToCMS = async (data: PageContentData) => {
    try {
      setIsLoading(true);
      await cmsService.createOrUpdatePageContent(data);
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };


  // Show loading state while CMS data is being fetched
  if (isLoading && !cmsData) {
    return (
      <div className="landing-page">
        <div className="cms-loading">
          Loading content...
        </div>
      </div>
    );
  }

  // Show error state if no data is available
  if (!cmsData) {
    return (
      <div className="landing-page">
        <div className="cms-loading">
          Failed to load content. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {isLoading && (
        <div className="cms-loading">
          Saving...
        </div>
      )}
      
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">

          
          <h1 className="hero-title">
            <span className="hero-title-main">
              <EditableText
                value={cmsData.title?.split(' ')[0] || 'Elevating'}
                onSave={(newValue) => handleTitleSave(`${newValue} Capital Markets Excellence`)}
                tag="span"
                placeholder="Elevating"
              />
            </span>
            <span className="hero-title-accent">
              <EditableText
                value={cmsData.title?.split(' ').slice(1, 3).join(' ') || 'Capital Markets'}
                onSave={(newValue) => handleTitleSave(`Elevating ${newValue} Excellence`)}
                tag="span"
                placeholder="Capital Markets"
              />
            </span>
            <span className="hero-title-sub">
              <EditableText
                value={cmsData.title?.split(' ')[3] || 'Excellence'}
                onSave={(newValue) => handleTitleSave(`Elevating Capital Markets ${newValue}`)}
                tag="span"
                placeholder="Excellence"
              />
            </span>
          </h1>
          
          <EditableText
            value={cmsData.subtitle || 'We deliver sophisticated investment banking solutions that\ndrive growth, maximize value, and create lasting success for\nour clients across global markets.'}
            onSave={handleSubtitleSave}
            tag="p"
            className="hero-description"
            multiline={true}
            placeholder="Enter your subtitle"
          />
          
          {/* Statistics within Hero */}
          <div className="hero-stats">
            <EditableNumbers
              numbers={cmsData.numbers || []}
              onSave={handleNumbersSave}
            />
          </div>
        </div>
      </section>

      {/* Merged Video & Insights Section */}
      <section className="merged-video-section">
        <div className="video-background">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
          >
            <source src="/videos/mainvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <div className="merged-content">
          <h2 className="merged-title">
            <EditableText
              value={visionData?.title || 'Where Vision Meets Expert Insights'}
              onSave={handleVisionTitleSave}
              tag="span"
              className="merged-title-text"
              placeholder="Enter title"
            />
          </h2>
          
          <EditableText
            value={visionData?.subtitle || 'Experience the power of strategic investment banking combined with\ncomprehensive market research, cutting-edge analysis, and proven strategies that\ndrive exceptional results across global markets.'}
            onSave={handleVisionSubtitleSave}
            tag="p"
            className="merged-description"
            multiline={true}
            placeholder="Enter subtitle"
          />
          
          <div className="merged-features">
            {visionData?.items?.map((item, index) => {
              // Array of icons to cycle through
              const icons = [BarChart3, Globe, DollarSign, Building2, Shield, Target, Users, Award];
              const IconComponent = icons[index % icons.length];
              
              console.log(`Rendering vision item ${index}:`, item);
              
              return (
                <div key={index} className="feature-card">
                  <button
                    onClick={() => {
                      const updatedItems = [...(visionData?.items || [])];
                      updatedItems.splice(index, 1);
                      handleItemsSave(updatedItems);
                    }}
                    className="feature-remove"
                    title="Remove this item"
                  >
                    ×
                  </button>
                  <div className="feature-icon">
                    <IconComponent size={20} />
                  </div>
                  <div className="feature-content">
                    <EditableText
                      value={item.title}
                      onSave={(newTitle) => {
                        const updatedItems = [...(visionData?.items || [])];
                        updatedItems[index] = { ...updatedItems[index], title: newTitle, description: updatedItems[index]?.description || '' };
                        handleItemsSave(updatedItems);
                      }}
                      tag="h4"
                      className="feature-title"
                      placeholder="Feature title"
                    />
                    <EditableText
                      value={item.description}
                      onSave={(newDescription) => {
                        const updatedItems = [...(visionData?.items || [])];
                        updatedItems[index] = { ...updatedItems[index], title: updatedItems[index]?.title || '', description: newDescription };
                        handleItemsSave(updatedItems);
                      }}
                      tag="p"
                      className="feature-description"
                      placeholder="Feature description"
                    />
                  </div>
                </div>
              );
            })}
            
          </div>
          
          <div className="merged-actions">
            <div className="button-with-edit">
              <Pencil 
                size={16} 
                className="edit-icon"
                onClick={() => {
                  // Trigger edit for first button
                  btnText1Ref.current?.triggerEdit();
                }}
              />
              <Link 
                href="/insights" 
                className="btn-primary-action"
                onMouseEnter={() => setHoveredButton('primary-action')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-5) var(--space-10)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  fontSize: 'var(--text-lg)',
                  background: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
                  color: '#000',
                  boxShadow: hoveredButton === 'primary-action' 
                    ? '0 15px 35px rgba(255, 255, 255, 0.2)' 
                    : '0 8px 25px rgba(255, 255, 255, 0.15)',
                  transform: hoveredButton === 'primary-action' ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                }}
              >
                <EditableText
                  ref={btnText1Ref}
                  value={visionData?.btnTxt?.[0]?.buttonText || 'Explore Market Insights'}
                  onSave={(newText) => {
                    const updatedBtnTxt = [...(visionData?.btnTxt || [{ buttonText: 'Explore Market Insights' }])];
                    updatedBtnTxt[0] = { buttonText: newText };
                    handleBtnTxtSave(updatedBtnTxt);
                  }}
                  tag="span"
                  className="btn-text btn-text-1"
                  placeholder="Button text"
                  disableDoubleClick={true}
                />
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Team Section */}
      <section className="story-team-section">
        <div className="story-team-background">
          <div className="story-team-gradient"></div>
          <div className="story-team-pattern"></div>
        </div>
        
        <div className="story-team-content">
          {/* Our Story */}
          <div className="story-section">
            <div className="story-header">
              <h2 className="story-title">
                <EditableText
                  value={storyData?.title || 'Our Story'}
                  onSave={handleStoryTitleSave}
                  tag="span"
                  className="story-title-text"
                  placeholder="Story title"
                />
              </h2>
              
              <EditableText
                value={storyData?.subtitle || 'Founded in 1998, Elluminate Capital has grown from a boutique advisory firm\nto a leading investment banking powerhouse. Our journey began with a simple\nmission: to provide exceptional financial advisory services that truly serve\nour clients\' best interests.'}
                onSave={handleStoryDescriptionSave}
                tag="p"
                className="story-description"
                multiline={true}
                placeholder="Story description"
              />
              
              <div className="story-actions">
                <Link href="/records" className="story-records-btn">
                  <span className="btn-text">View Our Track Records</span>
                  <ArrowRight className="btn-icon" />
                </Link>
              </div>
            </div>
            
          </div>
          
          {/* Leadership Team */}
          <div className="team-section">
            <div className="team-header">
              <h2 className="team-title">
                <EditableText
                  value={leadershipData?.title || 'Leadership Team'}
                  onSave={handleLeadershipTitleSave}
                  tag="span"
                  className="team-title-text"
                  placeholder="Team title"
                />
              </h2>
              
              <EditableText
                value={leadershipData?.subtitle || 'Meet the experienced professionals leading our firm with expertise,\nintegrity, and unwavering commitment to excellence.'}
                onSave={handleLeadershipSubtitleSave}
                tag="p"
                className="team-description"
                multiline={true}
                placeholder="Team description"
              />
            </div>
            
            <div className="team-grid">
              {leadershipData?.items?.map((item, index) => {
                const defaultImages = [
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                ];
                return (
                  <div key={index} className="team-member">
                    <button
                      onClick={() => {
                        const updatedItems = [...(leadershipData?.items || [])];
                        updatedItems.splice(index, 1);
                        handleLeadershipItemsSave(updatedItems);
                      }}
                      className="team-member-remove"
                      title="Remove this member"
                    >
                      ×
                    </button>
                    <div className="member-image">
                      <img 
                        src={defaultImages[index % defaultImages.length]} 
                        alt={item.title}
                      />
                    </div>
                    <div className="member-info">
                      <EditableText
                        value={item.title}
                        onSave={(newName) => {
                          const updatedItems = [...(leadershipData?.items || [])];
                          updatedItems[index] = { 
                            title: newName, 
                            description: updatedItems[index]?.description || 'New Position' 
                          };
                          handleLeadershipItemsSave(updatedItems);
                        }}
                        tag="h3"
                        className="member-name"
                        placeholder="Member name"
                      />
                      <EditableText
                        value={item.description}
                        onSave={(newPosition) => {
                          const updatedItems = [...(leadershipData?.items || [])];
                          updatedItems[index] = { 
                            title: updatedItems[index]?.title || 'New Member', 
                            description: newPosition 
                          };
                          handleLeadershipItemsSave(updatedItems);
                        }}
                        tag="p"
                        className="member-position"
                        placeholder="Member position"
                      />
                    </div>
                  </div>
                );
              })}
              
              <button
                onClick={() => {
                  const updatedItems = [...(leadershipData?.items || []), { title: 'New Member', description: 'New Position' }];
                  handleLeadershipItemsSave(updatedItems);
                }}
                className="team-member-add"
                title="Add new team member"
              >
                <div className="team-member-add-icon">+</div>
                <div className="team-member-add-text">Add Member</div>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Our Clients Section */}
      <section className="clients-section">
        <div className="clients-background">
          <div className="clients-gradient"></div>
          <div className="clients-pattern"></div>
        </div>

        <div className="clients-content">
          <h2 className="clients-title">
            <EditableText
              value={partnersData?.title || 'Founders we partner with'}
              onSave={handlePartnersTitleSave}
              tag="span"
              className="clients-title-text"
              placeholder="Partners title"
            />
          </h2>
          <EditableText
            value={partnersData?.subtitle || 'Trusted by category-defining companies worldwide'}
            onSave={handlePartnersDescriptionSave}
            tag="p"
            className="clients-description"
            placeholder="Partners description"
          />

          <div className="clients-carousel" aria-label="Our clients carousel">
            <div className="carousel-viewport" ref={carouselRef}>
              {clientProfiles.map((c) => (
                <div className="client-item" key={`${c.company}-${c.name}`}>
                  <div className="client-card">
                    <img className="client-image" src={c.image} alt={`${c.name} portrait`} />
                    <div className="client-overlay"></div>
                    <div className="client-logo-mark">{c.company}</div>
                  </div>
                  <div className="client-meta">{c.name}</div>
                </div>
              ))}
            </div>
            <div className="clients-nav">
              <button className="clients-btn" aria-label="Previous" onClick={() => scrollClients('prev')}>
                <ChevronLeft size={20} />
              </button>
              <button className="clients-btn" aria-label="Next" onClick={() => scrollClients('next')}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        
        
        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 120vh;
          display: flex;
          align-items: center;
          overflow: visible;
          padding: 80px 0 var(--space-20);
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-hero);
        }
        
        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, var(--color-accent) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 35%),
            radial-gradient(circle at 50% 20%, var(--color-accent-soft) 0%, transparent 30%);
          opacity: 0.08;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          text-align: center;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.6s ease;
        }
        
        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
        }
        
        .hero-title-main {
          display: block;
          color: var(--text-primary);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .hero-title-accent {
          display: block;
          color: var(--color-accent);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
        }
        
        .hero-title-sub {
          display: block;
          color: var(--text-primary);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }
        
        .hero-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--space-12);
          line-height: 1.6;
          white-space: pre-line;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .hero-stats {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 1.2s;
        }
        
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: var(--text-5xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-accent);
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .stat-label {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }
        
        /* Mobile Responsiveness for Hero Section */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            padding: 60px 0 var(--space-16);
          }
          
          .hero-content {
            padding: 0 var(--space-4);
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 10vw, 4rem);
            margin-bottom: var(--space-4);
          }
          
          .hero-description {
            font-size: var(--text-lg);
            margin-bottom: var(--space-8);
            padding: 0 var(--space-2);
            white-space: pre-line;
            text-align: center;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
            margin-top: var(--space-8);
          }
          
          .stat-item {
            padding: var(--space-4);
          }
          
          .stat-number {
            font-size: var(--text-3xl);
            margin-bottom: var(--space-1);
          }
          
          .stat-label {
            font-size: var(--text-sm);
          }
        }
        
        @media (max-width: 480px) {
          
          .hero-section {
            padding: 40px 0 var(--space-12);
          }
          
          .hero-title {
            font-size: clamp(2rem, 12vw, 3rem);
            line-height: 1.2;
          }
          
          .hero-description {
            font-size: var(--text-base);
            line-height: 1.5;
            white-space: pre-line;
            text-align: center;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          
          .stat-item {
            padding: var(--space-3);
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--radius-lg);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
        
        /* Merged Video & Insights Section */
        .merged-video-section {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .background-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.7) 30%,
            rgba(0, 0, 0, 0.8) 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
          z-index: 2;
        }
        
        .merged-content {
          position: relative;
          z-index: 3;
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
          text-align: center;
          color: white;
          overflow: visible;
        }
        
        .content-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-full);
          color: #ffffff;
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-8);
          backdrop-filter: blur(10px);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.6s ease;
        }
        
        .merged-title {
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-8);
          font-family: var(--font-family-heading);
          text-shadow: 0 6px 12px rgba(0, 0, 0, 0.8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .merged-title .highlight {
          color: #ffffff;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .merged-title-text {
          display: inline;
        }
        
        @keyframes shimmer {
          0%, 100% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
          50% { text-shadow: 0 0 30px rgba(212, 175, 55, 0.8); }
        }
        
        .merged-description {
          font-size: var(--text-xl);
          color: #ffffff !important;
          max-width: 800px;
          margin: 0 auto var(--space-32);
          line-height: 1.7;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }
        
        .merged-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
          margin: var(--space-16) auto var(--space-16);
          max-width: 1000px;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
          overflow: visible;
        }
        
        
        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-6);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
          position: relative;
          overflow: visible;
          max-width: 320px;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 215, 0, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.2);
        }
        
        .feature-card:hover::before {
          opacity: 1;
        }
        
        .feature-card:hover .feature-remove {
          opacity: 1;
        }
        
        .feature-remove {
          position: absolute;
          top: var(--space-2);
          right: var(--space-2);
          width: 24px;
          height: 24px;
          border: none;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          opacity: 0;
          transition: all var(--transition-normal);
          z-index: 10;
        }
        
        .feature-remove:hover {
          background: rgba(255, 0, 0, 1);
          transform: scale(1.1);
        }
        
        .feature-add {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
          background: rgba(255, 255, 255, 0.08);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-xl);
          cursor: pointer;
          transition: all var(--transition-normal);
          color: var(--text-secondary);
          min-height: 120px;
          backdrop-filter: blur(20px);
        }
        
        .feature-add:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-4px);
        }
        
        .feature-add-icon {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-2);
        }
        
        .feature-add-text {
          font-size: var(--text-base);
          font-weight: var(--font-weight-medium);
        }
        
        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          border-radius: var(--radius-lg);
          color: #000;
          flex-shrink: 0;
          box-shadow: 0 6px 16px rgba(255, 255, 255, 0.15);
          position: relative;
          z-index: 2;
        }
        
        .feature-content {
          text-align: left;
          position: relative;
          z-index: 2;
        }
        
        .feature-content h4 {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-bold);
          color: #ffffff !important;
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        .feature-content p {
          font-size: var(--text-sm);
          color: #ffffff !important;
          line-height: 1.5;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        .feature-title {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-bold);
          color: #ffffff !important;
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        .feature-description {
          font-size: var(--text-sm);
          color: #ffffff !important;
          line-height: 1.5;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        .merged-actions {
          display: flex;
          gap: var(--space-6);
          justify-content: center;
          flex-wrap: wrap;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .btn-primary-action, .btn-secondary-action, .btn-tertiary-action {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-5) var(--space-10);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-bold);
          text-decoration: none;
          transition: all 0.4s ease;
          border: 2px solid transparent;
          font-size: var(--text-lg);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-action {
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          color: #000;
          border-color: transparent;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
        }
        
        .btn-primary-action:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
        }
        
        .btn-secondary-action {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
        }
        
        .btn-secondary-action:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: white;
          transform: translateY(-4px) scale(1.05);
        }
        
        .btn-tertiary-action {
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(212, 175, 55, 0.8);
          backdrop-filter: blur(15px);
        }
        
        .btn-tertiary-action:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: #ffffff;
          transform: translateY(-4px) scale(1.05);
        }
        
        .btn-text {
          display: inline;
        }
        
        .button-with-edit {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
        }
        
        .edit-icon {
          cursor: pointer;
          color: #ffffff;
          transition: all 0.2s ease;
          padding: 4px;
          border-radius: 4px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        
        .edit-icon:hover {
          color: #FFD700;
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.5);
          transform: scale(1.1);
        }
        
        /* Responsive Design for Merged Section */
        @media (max-width: 1024px) {
          .merged-video-section {
            min-height: 90vh;
          }
          
          .merged-content {
            padding: var(--space-16) var(--space-4);
          }
          
          .merged-features {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
          
          .feature-card {
            flex-direction: column;
            text-align: center;
            padding: var(--space-6);
          }
          
          .feature-content {
            text-align: center;
          }
          
          .feature-add {
            min-height: 150px;
            padding: var(--space-6);
          }
        }
        
        @media (max-width: 768px) {
          .merged-video-section {
            min-height: 80vh;
          }
          
          .merged-content {
            padding: var(--space-12) var(--space-4);
          }
          
          .merged-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
            margin-bottom: var(--space-6);
          }
          
          .merged-description {
            font-size: var(--text-lg);
            margin-bottom: var(--space-8);
            padding: 0 var(--space-2);
          }
          
          .merged-features {
            gap: var(--space-4);
            margin-bottom: var(--space-12);
          }
          
          .feature-card {
            padding: var(--space-5);
            gap: var(--space-4);
          }
          
          .feature-icon {
            width: 40px;
            height: 40px;
          }
          
          .feature-content h4 {
            font-size: var(--text-lg);
            margin-bottom: var(--space-2);
          }
          
          .feature-content p {
            font-size: var(--text-sm);
          }
          
          .feature-add {
            min-height: 100px;
            padding: var(--space-4);
          }
          
          .merged-actions {
            flex-direction: column;
            align-items: center;
            gap: var(--space-4);
          }
          
          .btn-primary-action, .btn-secondary-action, .btn-tertiary-action {
            width: 100%;
            max-width: 350px;
            justify-content: center;
            padding: var(--space-4) var(--space-8);
            font-size: var(--text-base);
          }
        }
        
        @media (max-width: 480px) {
          .merged-video-section {
            min-height: 70vh;
          }
          
          .merged-content {
            padding: var(--space-8) var(--space-3);
          }
          
          .content-badge {
            font-size: var(--text-xs);
            padding: var(--space-2) var(--space-4);
            margin-bottom: var(--space-6);
          }
          
          .merged-title {
            font-size: clamp(2rem, 10vw, 3rem);
            line-height: 1.2;
            margin-bottom: var(--space-4);
          }
          
          .merged-description {
            font-size: var(--text-base);
            line-height: 1.6;
            margin-bottom: var(--space-6);
          }
          
          .merged-features {
            gap: var(--space-3);
            margin-bottom: var(--space-8);
          }
          
          .feature-card {
            padding: var(--space-4);
            gap: var(--space-3);
          }
          
          .feature-icon {
            width: 36px;
            height: 36px;
          }
          
          .feature-content h4 {
            font-size: var(--text-base);
            margin-bottom: var(--space-1);
          }
          
          .feature-content p {
            font-size: var(--text-xs);
            line-height: 1.5;
          }
          
          .feature-add {
            min-height: 80px;
            padding: var(--space-3);
          }
          
          .feature-add-icon {
            font-size: var(--text-xl);
          }
          
          .feature-add-text {
            font-size: var(--text-sm);
          }
          
          .btn-primary-action, .btn-secondary-action, .btn-tertiary-action {
            padding: var(--space-3) var(--space-6);
            font-size: var(--text-sm);
            gap: var(--space-2);
          }
        }
        
        /* Our Story & Team Section */
        .story-team-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: var(--space-20) 0;
          background: var(--bg-primary);
        }
        
        .story-team-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .story-team-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-luxury);
        }
        
        .story-team-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, var(--color-accent) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 35%),
            radial-gradient(circle at 50% 50%, var(--color-accent-soft) 0%, transparent 25%);
          opacity: 0.06;
        }
        
        .story-team-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          width: 100%;
        }
        
        .story-section {
          margin-bottom: var(--space-20);
        }
        
        .story-header {
          text-align: center;
          margin-bottom: var(--space-16);
        }
        
        .story-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-full);
          color: var(--text-accent);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.6s ease;
        }
        
        .story-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .story-title-accent {
          color: var(--color-accent);
        }
        
        .story-title-text {
          display: inline;
        }
        
        .story-description {
          font-size: var(--text-xl);
          color: #ffffff !important;
          max-width: 800px;
          margin: 0 auto var(--space-8) auto;
          line-height: 1.7;
          white-space: pre-line;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }

        .story-actions {
          display: flex;
          justify-content: center;
          margin-top: var(--space-6);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }

        .story-records-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          background: linear-gradient(135deg, var(--color-accent), #FFD700);
          color: #000;
          text-decoration: none;
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-semibold);
          font-size: var(--text-base);
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          border: none;
          cursor: pointer;
        }

        .story-records-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
          background: linear-gradient(135deg, #FFD700, var(--color-accent));
        }

        .story-records-btn .btn-text {
          font-family: var(--font-family-heading);
        }

        .story-records-btn .btn-icon {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .story-records-btn:hover .btn-icon {
          transform: translateX(4px);
        }
        
        
        .team-section {
          text-align: center;
        }
        
        .team-header {
          margin-bottom: var(--space-16);
        }
        
        .team-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .team-title-accent {
          color: var(--color-accent);
        }
        
        .team-title-text {
          display: inline;
        }
        
        .team-description {
          font-size: var(--text-xl);
          color: #ffffff !important;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          white-space: pre-line;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 1s;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 1.2s;
        }
        
        .team-member {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          text-align: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: visible;
        }
        
        .team-member::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-purple);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .team-member:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-luxury);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .team-member:hover::before {
          opacity: 0.05;
        }
        
        .member-image {
          width: 120px;
          height: 120px;
          border-radius: var(--radius-full);
          overflow: hidden;
          margin: 0 auto var(--space-6);
          border: 3px solid var(--color-accent);
          position: relative;
          z-index: 2;
        }
        
        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .member-info {
          position: relative;
          z-index: 2;
        }
        
        .member-name {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .member-position {
          color: var(--text-accent);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
        }
        
        .team-member-remove {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          opacity: 0;
          transition: opacity var(--transition-normal);
          z-index: 10;
        }
        
        .team-member:hover .team-member-remove {
          opacity: 1;
        }
        
        .team-member-add {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
          background: var(--bg-secondary);
          border: 2px dashed var(--border-primary);
          border-radius: var(--radius-xl);
          cursor: pointer;
          transition: all var(--transition-normal);
          color: var(--text-secondary);
          min-height: 200px;
        }
        
        .team-member-add:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(212, 175, 55, 0.1);
        }
        
        .team-member-add-icon {
          font-size: var(--text-4xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-3);
        }
        
        .team-member-add-text {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-medium);
        }
        
        /* Mobile Responsiveness for Story & Team Section */
        @media (max-width: 1024px) {
          .story-team-section {
            padding: var(--space-16) 0;
          }
          
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
          }
        }
        
        @media (max-width: 768px) {
          .story-team-section {
            padding: var(--space-12) 0;
          }
          
          .story-team-content {
            padding: 0 var(--space-4);
          }
          
          .story-section {
            margin-bottom: var(--space-16);
          }
          
          .story-title, .team-title {
            font-size: clamp(2rem, 8vw, 3.5rem);
            margin-bottom: var(--space-4);
          }
          
          .story-description, .team-description {
            font-size: var(--text-lg);
            margin-bottom: var(--space-8);
          }
          
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }
          
          .team-member {
            padding: var(--space-5);
          }
          
          .member-image {
            width: 80px;
            height: 80px;
            margin-bottom: var(--space-3);
          }
          
          .member-name {
            font-size: var(--text-base);
          }
          
          .member-position {
            font-size: var(--text-xs);
          }
        }
        
        @media (max-width: 480px) {
          .story-team-section {
            padding: var(--space-8) 0;
          }
          
          .story-team-content {
            padding: 0 var(--space-3);
          }
          
          .story-title, .team-title {
            font-size: clamp(1.8rem, 10vw, 2.8rem);
          }
          
          .story-description, .team-description {
            font-size: var(--text-base);
            line-height: 1.6;
          }
          
          .team-grid {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          
          .team-member {
            padding: var(--space-5);
          }
          
          .member-image {
            width: 80px;
            height: 80px;
          }
          
          .member-name {
            font-size: var(--text-base);
          }
          
          .member-position {
            font-size: var(--text-xs);
          }
        }
        
        /* Ending Section */
        .ending-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-primary);
        }
        
        .ending-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .ending-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-luxury);
        }
        
        .ending-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, var(--color-accent) 0%, transparent 30%),
            radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 35%),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 20%);
          opacity: 0.04;
        }
        
        .ending-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .ending-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: var(--space-20) var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        
        .ending-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: 60px;
          font-family: var(--font-family-heading);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .ending-title-accent {
          color: var(--color-accent);
        }
        
        .ending-title-text {
          display: inline;
        }
        
        .ending-description {
          font-size: var(--text-xl);
          color: #ffffff !important;
          max-width: 800px;
          margin: 0 auto 150px;
          line-height: 1.6;
          white-space: pre-line;
          text-align: center;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }
        
        .ending-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-8);
          margin-bottom: 80px;
          max-width: 1000px;
          width: 100%;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }
        
        .ending-stat {
          text-align: center;
          padding: var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-luxury);
          transition: all var(--transition-normal);
          position: relative;
          overflow: visible;
        }
        
        .ending-stat::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-purple);
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        
        .ending-stat:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: var(--shadow-luxury), var(--shadow-purple);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .ending-stat:hover::before {
          opacity: 0.05;
        }
        
        .ending-stat-number {
          font-size: var(--text-5xl);
          font-weight: var(--font-weight-bold);
          color: #d4af37 !important;
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .ending-stat-label {
          font-size: var(--text-lg);
          color: #ffffff !important;
          font-weight: var(--font-weight-medium);
        }
        
        .ending-stat-remove {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        
        .ending-stat:hover .ending-stat-remove {
          opacity: 1;
        }
        
        .ending-stat-add {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
          background: var(--bg-secondary);
          border: 2px dashed var(--border-primary);
          border-radius: var(--radius-xl);
          cursor: pointer;
          transition: all var(--transition-normal);
          color: var(--text-secondary);
          min-height: 120px;
        }
        
        .ending-stat-add:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(212, 175, 55, 0.1);
        }
        
        .ending-stat-add-icon {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-2);
        }
        
        .ending-stat-add-text {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
        }
        
        .ending-actions {
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .btn-ending-primary {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-5) var(--space-10);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-bold);
          text-decoration: none;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
          font-size: var(--text-xl);
        }
        
        .btn-ending-primary:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
        }
        
        /* Responsive Design for Ending Section */
        @media (max-width: 768px) {
          .ending-section {
            min-height: 80vh;
          }
          
          .ending-main {
            padding: var(--space-16) var(--space-4);
          }
          
          .ending-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }
          
          .btn-ending-primary {
            padding: var(--space-4) var(--space-8);
            font-size: var(--text-lg);
          }
        }
        
        @media (max-width: 480px) {
          .ending-stats {
            grid-template-columns: 1fr;
          }
        }
        
        /* Clients Section */
        .clients-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .clients-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .clients-gradient {
          position: absolute;
          inset: 0;
          background: var(--gradient-luxury);
          opacity: 0.6;
        }

        .clients-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 20%, var(--color-accent) 0%, transparent 28%),
            radial-gradient(circle at 85% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 32%),
            radial-gradient(circle at 50% 50%, var(--color-accent-soft) 0%, transparent 24%);
          opacity: 0.05;
        }

        .clients-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-20) var(--space-6);
          text-align: center;
        }

        .clients-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-4);
          font-family: var(--font-family-heading);
          color: var(--text-primary);
          text-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
        }

        .clients-title-accent {
          color: var(--color-accent);
        }
        
        .clients-title-text {
          display: inline;
        }

        .clients-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          margin: 0 auto var(--space-12);
          max-width: 720px;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.8s ease 0.4s;
        }

        .clients-carousel {
          position: relative;
          overflow: hidden;
          padding: var(--space-4) 0;
          /* Soft edge fade */
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .carousel-viewport {
          display: flex;
          align-items: stretch;
          gap: var(--space-6);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: var(--space-2);
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .carousel-viewport::-webkit-scrollbar { display: none; }

        .client-item {
          flex: 0 0 auto;
          width: clamp(280px, 30vw, 460px);
          scroll-snap-align: start;
        }

        .client-card {
          position: relative;
          height: clamp(380px, 52vh, 620px);
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-luxury);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .client-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-luxury), var(--shadow-purple);
          border-color: rgba(212, 175, 55, 0.45);
        }

        .client-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%);
          transform: scale(1.02);
        }

        .client-card:hover .client-image { filter: grayscale(0%); }

        .client-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%);
        }

        .client-logo-mark {
          position: absolute;
          left: 18px;
          bottom: 18px;
          padding: 10px 14px;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          border-radius: var(--radius-lg);
          color: #000;
          font-weight: var(--font-weight-bold);
          font-size: var(--text-xl);
          letter-spacing: 0.5px;
          box-shadow: 0 12px 28px rgba(212, 175, 55, 0.35);
        }

        .client-meta {
          margin-top: var(--space-3);
          color: var(--text-primary);
          font-weight: var(--font-weight-medium);
          font-size: var(--text-lg);
          text-align: left;
        }

        .clients-nav {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 10px;
          display: flex;
          gap: var(--space-3);
          justify-content: center;
          z-index: 3;
        }

        .clients-btn {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .clients-btn:hover {
          background: rgba(212, 175, 55, 0.18);
          border-color: #ffffff;
          transform: translateY(-2px);
        }

        /* Responsive Design for Clients Section */
        @media (max-width: 1024px) {
          .clients-content { padding: var(--space-16) var(--space-4); }
          .client-item { width: clamp(260px, 40vw, 400px); }
        }

        @media (max-width: 768px) {
          .clients-section { min-height: 80vh; }
          .clients-title { font-size: clamp(2rem, 8vw, 3.5rem); }
          .clients-description { font-size: var(--text-lg); margin-bottom: var(--space-8); }
          .client-item { width: clamp(220px, 70vw, 360px); }
          .client-card { height: clamp(340px, 50vh, 540px); }
        }

        @media (max-width: 480px) {
          .clients-section { min-height: 70vh; }
          .clients-content { padding: var(--space-12) var(--space-3); }
          .clients-description { font-size: var(--text-base); }
          .client-item { width: 85vw; }
          .client-card { height: 60vh; }
          .client-meta { font-size: var(--text-base); }
        }





      `}</style>
    </div>
  );
}


