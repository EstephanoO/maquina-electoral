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

export interface RegionMetrics {
  name: string;
  support: number;
  population: number;
  riskLevel: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
}