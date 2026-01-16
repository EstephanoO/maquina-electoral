export type Scene = "narrative" | "competitors" | "geohub" | "social";

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
  visible?: boolean;
}

export interface MetricProps {
  label: string;
  value: string;
  accent?: boolean;
}

export interface KPIProps {
  label: string;
  value: string;
  status: "low" | "mid" | "good";
}

export interface Competitor {
  name: string;
  power: string;
}