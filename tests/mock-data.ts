// Mock data types matching CacheService interface
export interface ScrapedPost {
  id: string;
  text: string;
  platform: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  ai: {
    score: number;
    cat: string;
    brief: string;
    strategy: string;
    risks: string[];
    community: string;
  };
}

export const mockScrapedData: ScrapedPost[] = [
  {
    id: 'fb-post-123',
    text: 'Este es un post de prueba sobre política que contiene opiniones diversas y genera debate ciudadano.',
    platform: 'FB',
    metrics: {
      likes: 150,
      comments: 45,
      shares: 23
    },
    ai: {
      score: -30,
      cat: 'ATAQUE',
      brief: 'Crítica política controversial',
      strategy: 'Responder con datos objetivos y mantener tono neutral',
      risks: ['Polarización', 'Desinformación'],
      community: 'Dividido entre partidarios y opositores con debate intenso'
    }
  },
  {
    id: 'ig-post-456',
    text: 'Compartimos nuestro logro más reciente en el proyecto de desarrollo comunitario #Éxito #Comunidad',
    platform: 'IG',
    metrics: {
      likes: 89,
      comments: 12,
      shares: 5
    },
    ai: {
      score: 75,
      cat: 'APOYO',
      brief: 'Logro comunitario celebrado',
      strategy: 'Amplificar mensaje y agradecer apoyo',
      risks: ['Expectativas altas'],
      community: 'Positivo y celebratorio con mucho apoyo'
    }
  }
];

export const mockUrls = {
  facebook: 'https://www.facebook.com/example/page/posts/123456789',
  instagram: 'https://www.instagram.com/p/ABC123DEF456/',
  tiktok: 'https://www.tiktok.com/@username/video/1234567890123456789'
};

export const mockExpiredAnalysis = {
  id: 1,
  postId: 1,
  aiAnalysis: mockScrapedData,
  analyzedAt: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
  expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago (expired)
  createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000)
};

export const mockValidAnalysis = {
  id: 2,
  postId: 2,
  aiAnalysis: mockScrapedData,
  analyzedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now (valid)
  createdAt: new Date(Date.now() - 30 * 60 * 1000)
};