export interface Airdrop {
  id: string;
  name: string;
  description: string;
  reward_amount: number;
  end_date: string;
  requirements: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  steps: string[];
  category: string;
  image_url?: string;
  created_at: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}