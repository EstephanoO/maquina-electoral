// Tipos para el análisis de redes sociales

export interface PostMetrics {
  likes: number;
  comments: number;
  shares: number;
}

export interface AIAnalysis {
  score: number; // -100 a 100
  cat: "CRISIS" | "ATAQUE" | "APOYO" | "INFORMATIVO";
  brief: string; // max 10 palabras
  strategy: string; // acción táctica
  risks: string[]; // array de riesgos
  community: string; // resumen sentimiento
}

export interface Post {
  id: string;
  text: string;
  platform: "FB" | "IG" | "TT" | "SYS";
  metrics: PostMetrics;
  ai: AIAnalysis;
  icon?: React.ReactNode; // Icono enriquecido del frontend
}

export interface AnalyzeResponse {
  success: boolean;
  posts: Post[];
  error?: string; // Para manejar errores
  fromCache?: boolean; // Indica si viene del caché
  cacheAge?: number; // Edad del caché en milisegundos
}

export interface PlatformConfig {
  actor: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export type StatusType = "idle" | "scraping" | "analyzing" | "done" | "error";