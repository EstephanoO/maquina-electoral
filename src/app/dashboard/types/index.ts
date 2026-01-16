export type Scene = "pulse" | "narrative" | "territory" | "competitors" | "geohub" | "social";

export interface CampaignContext {
  candidate: string;
  position: string;
  party: string;
  targetVoters: string;
  electionYear: number;
}

export interface NavigationItem {
  id: Scene;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  category?: 'primary' | 'secondary';
  badge?: string;
}

export interface SceneConfig {
  id: Scene;
  title: string;
  description: string;
  defaultLayout: 'grid' | 'focus' | 'split';
  customizableViews: boolean;
  widgets: WidgetConfig[];
}

export interface WidgetConfig {
  id: string;
  type: 'kpi' | 'chart' | 'map' | 'feed' | 'table';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number; w: number; h: number };
  dataSource?: string;
  customizable?: boolean;
}

export interface UserPreferences {
  favoriteScenes: Scene[];
  customLayouts: Record<Scene, WidgetConfig[]>;
  activeWidgets: string[];
  theme: 'dark' | 'matrix' | 'minimal';
}

export interface MetricProps {
  label: string;
  value: string;
  accent?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
}

export interface KPIProps {
  label: string;
  value: string;
  status: "low" | "mid" | "good";
  target?: string;
  progress?: number;
}

export interface Competitor {
  name: string;
  power: string;
}

// GeoHub Types
export interface GeographicData {
  region: string;
  coordinates: [number, number];
  population: number;
  supportLevel: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'markers' | 'regions' | 'routes';
  visible: boolean;
  data: any[];
  opacity: number;
}

// Social Types
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