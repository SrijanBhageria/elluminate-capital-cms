// Blog API Service
export interface BlogType {
  _id: string;
  typeId: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Blog {
  _id: string;
  blogId: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  typeId?: string;
  image?: string;
  tags?: string[];
  isPublished?: boolean;
  publishedAt?: Date;
  viewCount?: number;
  readTime?: number; // in minutes
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogTypeWithBlogs extends BlogType {
  blogs: Blog[];
}

export interface UpdateBlogTypeData {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CreateBlogData {
  title: string;
  slug?: string;
  excerpt?: string;
  author?: string;
  content?: string;
  typeId: string;
  image?: string;
  tags?: string[];
  isPublished?: boolean;
  publishedAt?: Date;
  readTime?: number; // in minutes
}

export interface UpdateBlogData {
  title?: string;
  excerpt?: string;
  author?: string;
  content?: string;
  tags?: string[];
  isPublished?: boolean;
  publishedAt?: Date;
  readTime?: number; // in minutes
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class BlogService {
  private baseUrl: string;

  constructor() {
    // Backend API URL - your server is running on port 5050
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
  }

  async getBlogTypes(): Promise<ApiResponse<BlogType[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/blog/getBlogTypes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching blog types:', error);
      throw error;
    }
  }

  async updateBlogType(typeId: string, data: UpdateBlogTypeData): Promise<ApiResponse<BlogType>> {
    try {
      const response = await fetch(`${this.baseUrl}/blog/updateBlogType?typeId=${typeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating blog type:', error);
      throw error;
    }
  }

  async getTypesWithBlogs(limit: number = 5, adminMode: boolean = false): Promise<ApiResponse<BlogTypeWithBlogs[]>> {
    try {
      console.log(`BlogService: Fetching types with blogs - limit: ${limit}, admin: ${adminMode}`);
      const response = await fetch(`${this.baseUrl}/blog/getTypesWithBlogs?limit=${limit}&admin=${adminMode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('BlogService: Types with blogs result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching types with blogs:', error);
      throw error;
    }
  }

  async updateBlog(blogId: string, data: UpdateBlogData): Promise<ApiResponse<Blog>> {
    try {
      const response = await fetch(`${this.baseUrl}/blog/updateBlog?blogId=${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }

  async createBlog(data: CreateBlogData): Promise<ApiResponse<Blog>> {
    try {
      console.log('BlogService: Creating blog with data:', data);
      const response = await fetch(`${this.baseUrl}/blog/createBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('BlogService: Create blog response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('BlogService: Create blog error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('BlogService: Create blog success result:', result);
      return result;
    } catch (error) {
      console.error('BlogService: Error creating blog:', error);
      throw error;
    }
  }

  async deleteBlog(blogId: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${this.baseUrl}/blog/deleteBlog?blogId=${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService();
