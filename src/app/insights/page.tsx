'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, TrendingUp, BarChart3, Globe, DollarSign, Clock, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { EditableText, EditableTextRef } from '../../components/EditableText';
import { cmsService, PageContentData } from '../../services/cmsService';
import { blogService, BlogType, BlogTypeWithBlogs, Blog, UpdateBlogData, CreateBlogData } from '../../services/blogService';
import { PageType } from '../../constants/pageTypes';

export default function InsightsPage() {
  // CMS State
  const [insightsData, setInsightsData] = useState<PageContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);
  const btnTextNewsRef = useRef<EditableTextRef>(null);

  // Blog Types State
  const [blogTypes, setBlogTypes] = useState<BlogType[]>([]);
  const [blogTypesWithBlogs, setBlogTypesWithBlogs] = useState<BlogTypeWithBlogs[]>([]);
  // Remove selectedCategory state since buttons are not filters
  
  // Dynamic refs for blog type components
  const blogTypeRefs = useRef<{ [key: string]: EditableTextRef | null }>({});

  // Dynamic blog type rendering - no hardcoded functions needed

  const defaultCategories = ['All'];
  const categories = insightsData?.btnTxt?.map(btn => btn.buttonText) || defaultCategories;

  // Load blog types
  const loadBlogTypes = async () => {
    try {
      const response = await blogService.getBlogTypes();
      if (response.success && response.data) {
        console.log('Loaded blog types:', response.data);
        setBlogTypes(response.data);
      } else {
        console.error('Failed to load blog types:', response.message);
      }
    } catch (error) {
      console.error('Error loading blog types:', error);
    }
  };

  // Load blog types with blogs
  const loadBlogTypesWithBlogs = async () => {
    try {
      const response = await blogService.getTypesWithBlogs(20, true); // 20 blogs per type, admin mode to see all blogs
      if (response.success && response.data) {
        console.log('Loaded blog types with blogs:', response.data);
        setBlogTypesWithBlogs(response.data);
      } else {
        console.error('Failed to load blog types with blogs:', response.message);
      }
    } catch (error) {
      console.error('Error loading blog types with blogs:', error);
    }
  };

  // Load insights data
  useEffect(() => {
    const loadInsightsData = async () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      
      try {
        setIsLoading(true);
        const [insightsResponse] = await Promise.all([
          cmsService.getPageContent(PageType.INSIGHTS),
          loadBlogTypesWithBlogs()
        ]);
        
        if (insightsResponse.success && insightsResponse.data) {
          setInsightsData(insightsResponse.data);
        } else {
          console.error('Failed to load insights page content:', insightsResponse.message);
        }
      } catch (error) {
        console.error('Error loading insights content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInsightsData();
  }, []);

  // Handlers
  const handleInsightsTitleSave = async (newTitle: string) => {
    const updatedData = { 
      ...insightsData, 
      pageType: PageType.INSIGHTS,
      title: newTitle 
    };
    setInsightsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleInsightsSubtitleSave = async (newSubtitle: string) => {
    const updatedData = { 
      ...insightsData, 
      pageType: PageType.INSIGHTS,
      subtitle: newSubtitle 
    };
    setInsightsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleInsightsBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    const updatedData = { 
      ...insightsData, 
      pageType: PageType.INSIGHTS,
      btnTxt: newBtnTxt 
    };
    setInsightsData(updatedData);
    await saveToCMS(updatedData);
  };

  // Blog type handlers
  const handleBlogTypeUpdate = async (typeId: string, field: string, value: string) => {
    try {
      console.log('Updating blog type:', { typeId, field, value });
      const updateData = { [field]: value };
      const response = await blogService.updateBlogType(typeId, updateData);
      
      if (response.success && response.data) {
        console.log('Blog type updated successfully:', response.data);
        // Reload blog types with blogs to get the updated data from server
        await loadBlogTypesWithBlogs();
      } else {
        console.error('Failed to update blog type:', response.message);
      }
    } catch (error) {
      console.error('Error updating blog type:', error);
    }
  };

  // Convert human-readable date to ISO 8601 format
  const convertDateToISO = (dateString: string): string => {
    try {
      // Parse the human-readable date (e.g., "October 5, 2025")
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      // Convert to ISO 8601 format
      return date.toISOString();
    } catch (error) {
      console.error('Error converting date:', error);
      // Return current date as fallback
      return new Date().toISOString();
    }
  };

  // Update blog content
  const handleBlogUpdate = async (blogId: string, field: keyof UpdateBlogData, value: string | Date | number) => {
    try {
      let updateValue = value;
      
      // Convert date string to ISO format if it's a publishedAt field
      if (field === 'publishedAt' && typeof value === 'string') {
        updateValue = convertDateToISO(value);
      }
      
      const updateData: UpdateBlogData = { [field]: updateValue };
      const response = await blogService.updateBlog(blogId, updateData);
      
      if (response.success && response.data) {
        console.log('Blog updated successfully:', response.data);
        // Reload blog types with blogs to get the updated data from server
        await loadBlogTypesWithBlogs();
      } else {
        console.error('Failed to update blog:', response.message);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  // Generate sequential slug
  const generateSlug = (typeId: string): string => {
    // Find all blogs of this type to count existing ones
    const blogType = blogTypesWithBlogs.find(type => type.typeId === typeId);
    const existingBlogs = blogType?.blogs || [];
    const nextNumber = existingBlogs.length + 1;
    return `new-blog-${nextNumber}`;
  };

  // Create blog
  const handleBlogCreate = async (typeId: string) => {
    try {
      console.log('Creating blog for typeId:', typeId);
      
      // Get the blog type name for better default content
      const blogType = blogTypesWithBlogs.find(type => type.typeId === typeId);
      const typeName = blogType?.name || 'Blog';
      
      const newBlogData: CreateBlogData = {
        title: `New ${typeName} Post`,
        slug: generateSlug(typeId),
        excerpt: `Enter your ${typeName.toLowerCase()} excerpt here...`,
        author: 'Author Name',
        content: 'new content new content',
        typeId: typeId,
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop', // Default image for articles
        tags: ['new', typeName.toLowerCase()],
        isPublished: false,
        readTime: 5,
        publishedAt: new Date() // Add published date for proper card display
      };

      console.log('Sending create blog request with data:', newBlogData);
      const response = await blogService.createBlog(newBlogData);
      
      if (response.success && response.data) {
        console.log('Blog created successfully:', response.data);
        // Reload blog types with blogs to get the updated data from server
        console.log('Reloading blog types with blogs...');
        await loadBlogTypesWithBlogs();
        console.log('Blog types reloaded successfully');
      } else {
        console.error('Failed to create blog:', response.message);
        alert(`Failed to create blog: ${response.message}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert(`Error creating blog: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Delete blog
  const handleBlogDelete = async (blogId: string) => {
    try {
      if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
        const response = await blogService.deleteBlog(blogId);
        
        if (response.success) {
          console.log('Blog deleted successfully');
          // Reload blog types with blogs to get the updated data from server
          await loadBlogTypesWithBlogs();
        } else {
          console.error('Failed to delete blog:', response.message);
        }
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const saveToCMS = async (data: PageContentData) => {
    try {
      setIsLoading(true);
      await cmsService.createOrUpdatePageContent(data);
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <EditableText
            value={insightsData?.title || 'Market Insights'}
            onSave={handleInsightsTitleSave}
            tag="h1"
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
            placeholder="Insights title"
          />
          <EditableText
            value={insightsData?.subtitle || 'Stay informed with our latest research, market analysis, and investment insights\nfrom our team of financial experts.'}
            onSave={handleInsightsSubtitleSave}
            tag="p"
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
            multiline={true}
            placeholder="Insights description"
          />
        </div>
      </section>

      {/* Categories Filter */}
      <section
        style={{
          padding: 'var(--space-8) var(--space-6)',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                // Remove onClick since buttons are not filters
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
              >
                <EditableText
                  value={category}
                  onSave={(newText) => {
                    // Update CMS button text for categories
                    const updatedBtnTxt = [...(insightsData?.btnTxt || defaultCategories.map(cat => ({ buttonText: cat })))];
                    updatedBtnTxt[index] = { buttonText: newText };
                    handleInsightsBtnTxtSave(updatedBtnTxt);
                  }}
                  tag="span"
                  className={`btn-text btn-text-category-${index}`}
                  placeholder="Category name"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Blog Type Sections */}
      {blogTypesWithBlogs.map((blogType, index) => (
      <section
          key={blogType.typeId}
        style={{
          padding: 'var(--space-20) var(--space-6)',
            background: index % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
            <EditableText
                  ref={(el) => {
                    blogTypeRefs.current[blogType.typeId] = el;
                  }}
                  value={blogType.name}
              onSave={(newText) => {
                    handleBlogTypeUpdate(blogType.typeId, 'name', newText);
              }}
              tag="h2"
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-family-heading)',
                margin: 0,
              }}
              placeholder="Section title"
            />
              <EditableText
                  value={blogType.description || "Content description"}
                onSave={(newText) => {
                    handleBlogTypeUpdate(blogType.typeId, 'description', newText);
                  }}
                  tag="span"
                style={{
                  fontSize: 'var(--text-lg)',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                  placeholder="Section description"
                  />
                </div>
            <button
              onClick={() => {
                  handleBlogCreate(blogType.typeId);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--color-accent)',
                color: 'var(--text-inverse)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
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
              <Pencil size={16} />
              Add Blog
            </button>
          </div>
          
            {/* Blog Type Content */}
            {blogType.blogs && blogType.blogs.length > 0 ? (
              <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'var(--space-8)',
              }}>
                {blogType.blogs.map((blog, blogIndex) => (
              <article
                    key={blog.blogId}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-primary)',
                  transition: 'all var(--transition-normal)',
                      position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                  <button
                    onClick={() => {
                        handleBlogDelete(blog.blogId);
                    }}
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      background: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        opacity: 0,
                        transition: 'all var(--transition-normal)',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.background = 'rgba(255, 0, 0, 1)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0';
                        e.currentTarget.style.background = 'rgba(255, 0, 0, 0.8)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                      title="Delete this blog"
                  >
                      ×
                  </button>
                    <div style={{ position: 'relative', height: index === 3 ? '150px' : '200px', overflow: 'hidden' }}>
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop'}
                        alt={blog.title}
                    style={{
                      width: '100%',
                          height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                      {index === 3 ? (
                        <div style={{
                          position: 'absolute',
                          top: 'var(--space-3)',
                          right: 'var(--space-3)',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: 'var(--space-1) var(--space-2)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-xs)',
                        }}>
                          {Math.floor(Math.random() * 3 + 1)}.{Math.floor(Math.random() * 9 + 1)} MB
                        </div>
                      ) : (
                        <div style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      left: 'var(--space-3)',
                      background: 'var(--color-accent)',
                      color: 'var(--text-inverse)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                        }}>
                          {blogType.name}
                  </div>
                      )}
                </div>
                <div style={{ padding: 'var(--space-6)' }}>
                  <EditableText
                        value={blog.title || 'Untitled Blog'}
                    onSave={(newText) => {
                        handleBlogUpdate(blog.blogId, 'title', newText);
                    }}
                    tag="h3"
                    style={{
                          fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-3)',
                          lineHeight: '1.3',
                    }}
                        placeholder={index === 3 ? "Report title" : "Blog title"}
                  />
                  <EditableText
                        value={blog.excerpt || 'No excerpt available'}
                    onSave={(newText) => {
                        handleBlogUpdate(blog.blogId, 'excerpt', newText);
                    }}
                    tag="p"
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                        }}
                        placeholder={index === 3 ? "Report description" : "Blog excerpt"}
                      />
                      
                      {index === 3 ? (
                        // Report-style layout for fourth blog type
                        <>
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                              {Math.floor(Math.random() * 5000 + 1000).toLocaleString()} downloads
                    </span>
                    </div>
            <button
              style={{
                              width: '100%',
                              padding: 'var(--space-3)',
                background: 'var(--color-accent)',
                color: 'var(--text-inverse)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
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
                            Download Report
            </button>
                        </>
                      ) : (
                        // Regular blog layout for first three blog types
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <User size={14} color="var(--text-accent)" />
                  <EditableText
                                value={blog.author || 'Unknown Author'}
                    onSave={(newText) => {
                                  handleBlogUpdate(blog.blogId, 'author', newText);
                                }}
                                tag="span"
                                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}
                                placeholder="Author name"
                              />
                            </div>
                  <EditableText
                              value={blog.readTime ? `${blog.readTime} min read` : '5 min read'}
                    onSave={(newText) => {
                                const readTimeMatch = newText.match(/(\d+)/);
                                const readTimeValue = readTimeMatch ? parseInt(readTimeMatch[1]) : 5;
                                handleBlogUpdate(blog.blogId, 'readTime', readTimeValue);
                              }}
                              tag="span"
                              style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}
                              placeholder="5 min read"
                            />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <Calendar size={14} color="var(--text-accent)" />
                              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                                {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }) : 'No date'}
                    </span>
                  </div>
                  <button
                    style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)',
                                background: 'none',
                      border: 'none',
                                color: 'var(--text-accent)',
                      fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--color-accent-dark)';
                    }}
                    onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--text-accent)';
                    }}
                  >
                              Read More
                              <ArrowRight size={14} />
                  </button>
                </div>
                        </>
                      )}
              </div>
                  </article>
            ))}
          </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: 'var(--space-16)',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-xl)',
                border: '2px dashed var(--border-primary)',
                color: 'var(--text-secondary)',
              }}>
                <p>No blogs available for this category yet.</p>
                <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                  Click "Add Blog" to create the first blog post.
                </p>
              </div>
            )}
        </div>
      </section>
      ))}
    </div>
  );
}
