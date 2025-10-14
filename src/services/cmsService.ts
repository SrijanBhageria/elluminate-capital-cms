// CMS API Service
import { PageType } from '../constants/pageTypes';

export interface PageContentData {
  pageType: PageType;
  title?: string;
  subtitle?: string;
  content?: string;
  slug?: string;
  items?: Array<{ title: string; description: string }>;
  numbers?: Array<{ value: string; label: string }>;
  btnTxt?: Array<{ buttonText: string }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class CMSService {
  private baseUrl: string;

  constructor() {
    // Backend API URL - your server is running on port 5050
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
  }

  async createOrUpdatePageContent(data: PageContentData): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/page/createOrUpdatePageContent`, {
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
      console.error('Error creating/updating page content:', error);
      throw error;
    }
  }

  async getPageContent(pageType: PageType): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/page/getPageContent?pageType=${pageType}`, {
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
      console.error('Error fetching page content:', error);
      throw error;
    }
  }
}

export const cmsService = new CMSService();
