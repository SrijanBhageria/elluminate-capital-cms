// Footer API Service
export interface FooterLink {
  text: string;
  url?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon?: string;
}

export interface LegalLink {
  text: string;
  url?: string;
}

export interface FooterData {
  companyName: string;
  companyDescription: string;
  contact: ContactInfo;
  sections: FooterSection[];
  socialMedia: SocialMedia[];
  backToTopText: string;
  copyrightText: string;
  legalLinks: LegalLink[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class FooterService {
  private baseUrl: string;

  constructor() {
    // Backend API URL - your server is running on port 5050
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
  }

  async createOrUpdateFooter(data: Partial<FooterData>): Promise<ApiResponse<FooterData>> {
    try {
      const response = await fetch(`${this.baseUrl}/footer/createOrUpdateFooter`, {
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
      console.warn('Footer API not available, using local storage fallback:', error);
      // Fallback to local storage for development
      const fallbackData = { ...data } as FooterData;
      localStorage.setItem('footerData', JSON.stringify(fallbackData));
      return {
        success: true,
        message: 'Footer content saved locally (API unavailable)',
        data: fallbackData
      };
    }
  }

  async getFooter(): Promise<ApiResponse<FooterData | null>> {
    try {
      const response = await fetch(`${this.baseUrl}/footer/getFooter`, {
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
      console.warn('Footer API not available, checking local storage:', error);
      // Fallback to local storage for development
      const localData = localStorage.getItem('footerData');
      if (localData) {
        return {
          success: true,
          message: 'Footer content loaded from local storage (API unavailable)',
          data: JSON.parse(localData)
        };
      }
      return {
        success: true,
        message: 'No footer data found',
        data: null
      };
    }
  }

  // Helper method to update specific footer fields
  async updateFooterField(field: keyof FooterData, value: any): Promise<ApiResponse<FooterData>> {
    const updateData: Partial<FooterData> = {};
    updateData[field] = value;
    return this.createOrUpdateFooter(updateData);
  }

  // Helper method to update contact information
  async updateContactInfo(contactData: ContactInfo): Promise<ApiResponse<FooterData>> {
    return this.createOrUpdateFooter({ contact: contactData });
  }

  // Helper method to update a specific section
  async updateSection(sectionIndex: number, sectionData: Partial<FooterSection>): Promise<ApiResponse<FooterData>> {
    // First get current footer data
    const currentFooter = await this.getFooter();
    if (!currentFooter.data) {
      throw new Error('No footer data found');
    }

    const updatedSections = [...currentFooter.data.sections];
    updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], ...sectionData };

    return this.createOrUpdateFooter({ sections: updatedSections });
  }

  // Helper method to update social media links
  async updateSocialMedia(socialData: SocialMedia[]): Promise<ApiResponse<FooterData>> {
    return this.createOrUpdateFooter({ socialMedia: socialData });
  }

  // Helper method to update legal links
  async updateLegalLinks(legalData: LegalLink[]): Promise<ApiResponse<FooterData>> {
    return this.createOrUpdateFooter({ legalLinks: legalData });
  }
}

export const footerService = new FooterService();
