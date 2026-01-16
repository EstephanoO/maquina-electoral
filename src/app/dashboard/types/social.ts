export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'youtube';
  content: string;
  author: string;
  metrics: {
    likes: number;
    shares: number;
    comments: number;
    reach: number;
    engagement: number;
  };
  sentiment: {
    score: number;
    category: 'positive' | 'negative' | 'neutral';
    confidence: number;
  };
  timestamp: string;
  tags: string[];
  verified: boolean;
}

export interface SocialTrend {
  keyword: string;
  volume: number;
  growth: number;
  sentiment: number;
  posts: SocialPost[];
  timeframe: string;
}

export interface PlatformMetrics {
  platform: string;
  reach: number;
  engagement: number;
  sentiment: number;
  growth: number;
  topPosts: SocialPost[];
}

export interface SocialAlert {
  id: string;
  type: 'sentiment' | 'viral' | 'competitor' | 'crisis';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  relatedPosts?: string[];
}