// TypeScript interface for a section within an investment card
export interface ISection {
  sectionId?: string;   // UUID for unique identification
  title?: string;       // "DESCRIPTION", "FOUNDERS", etc.
  content?: any;        // The actual content (string, array, object)
  order?: number;       // Display order (1, 2, 3, etc.)
}

// TypeScript interface for the Investment Card document
export interface IInvestmentCard {
  _id: string;
  cardId?: string;
  companyName?: string;
  companyLogo?: string;
  sections?: ISection[];
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// API Response interface
export interface InvestmentCardResponse {
  success: boolean;
  message: string;
  data: IInvestmentCard[];
}

// Create/Update Response interface
export interface CreateUpdateInvestmentCardResponse {
  success: boolean;
  message: string;
  data: IInvestmentCard;
}

// Create/Update data interface
export interface CreateInvestmentCardData {
  cardId?: string;
  companyName?: string;
  companyLogo?: string;
  sections?: ISection[];
  isDeleted?: boolean;
}

class InvestmentCardService {
  private baseUrl: string;

  constructor() {
    // Use the same base URL as other services
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  async getAllInvestmentCards(): Promise<IInvestmentCard[]> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/getAllInvestmentCards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: InvestmentCardResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch investment cards');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching investment cards:', error);
      throw error;
    }
  }

  // Helper method to get section content by title
  getSectionContent(card: IInvestmentCard, sectionTitle: string): any {
    if (!card.sections) return null;
    
    const section = card.sections.find(s => 
      s.title?.toLowerCase() === sectionTitle.toLowerCase()
    );
    
    return section?.content || null;
  }

  // Helper method to get description
  getDescription(card: IInvestmentCard): string {
    return this.getSectionContent(card, 'DESCRIPTION') || '';
  }

  // Helper method to get founders
  getFounders(card: IInvestmentCard): string[] {
    const founders = this.getSectionContent(card, 'FOUNDERS');
    if (Array.isArray(founders)) {
      return founders;
    }
    if (typeof founders === 'string') {
      return founders.split(',').map(f => f.trim());
    }
    return [];
  }

  // Helper method to get investment info
  getInvestment(card: IInvestmentCard): string {
    return this.getSectionContent(card, 'INVESTMENT') || 
           this.getSectionContent(card, 'INITIAL INVESTMENT') || '';
  }

  async createOrUpdateInvestmentCard(cardData: CreateInvestmentCardData): Promise<IInvestmentCard> {
    try {
      const response = await fetch(`${this.baseUrl}/cards/createOrUpdateInvestmentCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CreateUpdateInvestmentCardResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create or update investment card');
      }

      return result.data;
    } catch (error) {
      console.error('Error creating/updating investment card:', error);
      throw error;
    }
  }
}

export const investmentCardService = new InvestmentCardService();
